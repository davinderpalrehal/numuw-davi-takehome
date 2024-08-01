from rest_framework import serializers

from accounts.models import NumuwUser
from .models import Message, Conversation


class ConversationSerializer(serializers.ModelSerializer):
    therapist_id = serializers.PrimaryKeyRelatedField(queryset=NumuwUser.objects.all())
    parent_id = serializers.PrimaryKeyRelatedField(queryset=NumuwUser.objects.all())

    class Meta:
        model = Conversation
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'