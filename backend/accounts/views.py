from rest_framework.generics import RetrieveAPIView, get_object_or_404
from .models import NumuwUser
from .permissions import IsTherapistOrParent
from .serializers import UserSerializer

class UserDetailView(RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsTherapistOrParent]

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        if user_id:
            return get_object_or_404(NumuwUser, id=user_id)
        return self.request.user
