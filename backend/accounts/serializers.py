from rest_framework import serializers
from .models import NumuwUser, Therapist, Patient, Parent

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NumuwUser
        fields = ['username', 'password', 'user_type', 'first_name', 'last_name', 'email']
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
