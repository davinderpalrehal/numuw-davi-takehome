from rest_framework import viewsets
from .models import NumuwUser
from .permissions import IsTherapistOrParent
from .serializers import UserSerializer

class UserDetailView(viewsets.ReadOnlyModelViewSet):
    queryset = NumuwUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsTherapistOrParent]

    def get_object(self):
        return self.request.user
