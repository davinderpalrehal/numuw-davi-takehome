from rest_framework import generics
from .models import NumuwUser
from .serializers import UserSerializer

class UserCreateView(generics.CreateAPIView):
    queryset = NumuwUser.objects.all()
    serializer_class = UserSerializer
