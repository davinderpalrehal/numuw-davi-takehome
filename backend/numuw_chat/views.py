from rest_framework import viewsets, status
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from accounts.models import NumuwUser, Therapist
from accounts.serializers import PatientSerializer
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer
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
