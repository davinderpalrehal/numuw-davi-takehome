from rest_framework.generics import RetrieveAPIView
from .models import NumuwUser
from .permissions import IsTherapistOrParent
from .serializers import UserSerializer

class UserDetailView(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsTherapistOrParent]

    def get_object(self):
        return self.request.user
