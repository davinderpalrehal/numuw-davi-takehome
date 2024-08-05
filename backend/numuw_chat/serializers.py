from rest_framework import serializers
from accounts.models import NumuwUser
from .models import Message, Conversation


class ConversationSerializer(serializers.ModelSerializer):
    therapist_id = serializers.PrimaryKeyRelatedField(queryset=NumuwUser.objects.all())
    parent_id = serializers.PrimaryKeyRelatedField(queryset=NumuwUser.objects.all())
    messages = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = '__all__'

    def get_messages(self, obj):
        messages = Message.objects.filter(conversation=obj).sort('created_at')
        return MessageSerializer(messages, many=True).data

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


class ConversationRequestSerializer(serializers.Serializer):
    therapist_id = serializers.PrimaryKeyRelatedField(queryset=NumuwUser.objects.filter(user_type='therapist'))
    message = serializers.CharField(max_length=500)