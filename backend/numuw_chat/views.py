from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from rest_framework import viewsets, status, generics
from rest_framework.generics import RetrieveAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from accounts.models import NumuwUser, Therapist, Parent
from accounts.serializers import PatientSerializer
from .models import Conversation, Message
from .serializers import (
    ConversationSerializer,
    MessageSerializer,
    ConversationRequestSerializer,
)
from accounts.permissions import IsTherapistOrParent


class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsTherapistOrParent]


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsTherapistOrParent]


class ChatHistoryView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        therapist_id = request.data.get("therapist_id")
        parent_id = request.data.get("parent_id")

        if not therapist_id or not parent_id:
            return Response({"error": "Missing therapist_id or parent_id"})

        try:
            conversation = Conversation.object.filter(
                therapist_id=therapist_id, parent_id=parent_id
            )
        except Conversation.DoesNotExist:
            return Response({"error": "Not conversation found between these two users"})

        messages = Message.objects.filter(conversation=conversation)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TherapistPatientsView(RetrieveAPIView):
    permission_classes = [IsTherapistOrParent]

    def retrieve(self, request, *args, **kwargs):
        try:
            therapist = Therapist.objects.get(id=request.user.id)
            patients = therapist.patients.all()
            serializer = PatientSerializer(patients, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Therapist.DoesNotExist:
            return Response(
                {"error": "Therapist does not exist"}, status=status.HTTP_404_NOT_FOUND
            )


class StartConversationView(APIView):
    def post(self, request):
        therapist_id = request.data.get("therapist_id")
        parent_id = request.data.get("parent_id")

        try:
            therapist = NumuwUser.objects.get(id=therapist_id)
            parent = NumuwUser.objects.get(id=parent_id)
        except NumuwUser.DoesNotExist:
            return Response(
                {"error": "Therapist or parent does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

        conversation, created = Conversation.objects.get_or_create(
            therapist=therapist, parent=parent, status="open"
        )

        serializer = ConversationSerializer(conversation)
        if created:
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RequestConversationView(APIView):
    permission_classes = [IsTherapistOrParent]

    def post(self, request):
        serializer = ConversationRequestSerializer(data=request.data)
        if serializer.is_valid():
            therapist = serializer.validated_data["therapist_id"]
            message_content = serializer.validated_data["message"]
            parent = request.user

            if parent.user_type != "parent":
                return Response(
                    {"error": "Only parents can request conversations with therapists"},
                    status=status.HTTP_403_FORBIDDEN,
                )

            parent_instance = Parent.objects.get(user=parent)
            therapist_instance = Therapist.objects.get(user=therapist)
            related_patients = parent_instance.patients.filter(
                therapists=therapist_instance
            )

            if not related_patients.exists():
                return Response(
                    {"error": "Your child is not associated with this therapist"},
                    status=status.HTTP_403_FORBIDDEN,
                )

            conversation = Conversation.objects.create(
                therapist=therapist,
                parent=parent,
                status="pending",
            )

            Message.objects.create(
                conversation=conversation, sender=parent, content=message_content
            )

            return Response(
                {"success": "Conversation request sent"}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConversationListView(generics.ListAPIView):
    serializer_class = ConversationSerializer
    permission_classes = [IsTherapistOrParent]

    def get_queryset(self):
        user = self.request.user
        other_user_id = self.request.query_params.get('user_id', None)

        if other_user_id:
            try:
                other_user = NumuwUser.objects.get(id=other_user_id)
            except NumuwUser.DoesNotExist:
                return Conversation.objects.none()

            if user.user_type == "therapist":
                return Conversation.objects.filter(therapist=user, parent=other_user)
            elif user.user_type == "parent":
                return Conversation.objects.filter(parent=user, therapist=other_user)
            else:
                return Conversation.objects.none()
        else:
            if user.user_type == 'therapist':
                return Conversation.objects.filter(therapist=user)
            elif user.user_type == 'parent':
                return Conversation.objects.filter(parent=user)
            else:
                return Conversation.objects.none()


class SendNotificationView(APIView):
    def post(self, request):
        therapist_id = request.POST.get('therapist_id')
        message = request.POST.get('message')

        channel_layer = get_channel_layer()
        group_name = f"chat_{therapist_id}"

        async_to_sync(channel_layer.group_sent)(
            group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

        return JsonResponse({'status': 'Notification sent'})


class UpdateConversationStateView(generics.UpdateAPIView):
    serializer_class = ConversationSerializer
    permission_classes = [IsTherapistOrParent]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 'therapist':
            return Conversation.objects.filter(therapist=user)
        else:
            return Conversation.objects.none()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user.user_type != 'therapist':
            return Response({"error": "Only therapists can update conversation state"}, status=status.HTTP_403_FORBIDDEN)
        return super().update(request, *args, **kwargs)


class UploadMediaView(generics.CreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsTherapistOrParent]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        conversation_id = request.data.get('conversation_id')
        conversation = Conversation.objects.filter(id=conversation_id, status='open').first()

        if not conversation:
            return Response({'error': 'Conversation must be in an open state to upload media'}, status=status.HTTP_400_BAD_REQUEST)

        request.data['sender'] = request.user.id
        request.data['conversation'] = conversation.id

        return self.create(request, *args, **kwargs)
