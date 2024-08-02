from rest_framework import serializers

from accounts.models import NumuwUser, Patient, Parent, UserProfile
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

class NumuwUserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = NumuwUser
        fields = ['id', 'first_name', 'last_name', 'profile_picture']

    def get_profile_picture(self, obj):
        try:
            return obj.userprofile.profile_picture.url
        except UserProfile.DoesNotExist:
            return None


class ParentSerializer(serializers.ModelSerializer):
    user = NumuwUserSerializer()

    class Meta:
        model = Parent
        fields = ['user']

class PatientSerializer(serializers.ModelSerializer):
    user = NumuwUserSerializer()
    parents = ParentSerializer(many=True, read_only=True)

    class Meta:
        model = Patient
        fields = ['user', 'parents']