from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

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
        therapist_id = request.data.get('therapist_id')
        parent_id = request.data.get('parent_id')

        if not therapist_id or not parent_id:
            return Response({
                'error': 'Missing therapist_id or parent_id'
            })

        try:
            conversation = Conversation.object.filter(therapist_id=therapist_id, parent_id=parent_id)
        except Conversation.DoesNotExist:
            return Response({
                'error': 'Not conversation found between these two users'
            })

        messages = Message.objects.filter(conversation=conversation)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

