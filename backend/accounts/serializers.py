from rest_framework import serializers
from .models import NumuwUser, Therapist, Patient, Parent, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_picture']


class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = NumuwUser
        fields = ['username', 'password', 'user_type', 'first_name', 'last_name', 'email', 'profile_picture']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = NumuwUser.objects.create_user(**validated_data)
        if user.user_type == 'therapist':
            Therapist.objects.create(user=user)
        elif user.user_type == 'patient':
            Patient.objects.create(user=user)
        elif user.user_type == 'parent':
            Parent.objects.create(user=user)
        return user

    def get_profile_picture(self, obj):
        try:
            return obj.userprofile.profile_picture.url
        except UserProfile.DoesNotExist:
            return None