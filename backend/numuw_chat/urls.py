from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from accounts.models import NumuwUser
from . import settings
from .views import ConversationViewSet, MessageViewSet, ChatHistoryView
from accounts.views import UserDetailView

router = routers.DefaultRouter()
router.register(r'conversations', ConversationViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'user_details', UserDetailView, basename='user-details')

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')

        try:
            user = NumuwUser.objects.get(username=username)
            if not user.can_login:
                return Response({
                    'error': 'User is not allowed to login'
                },
                status=status.HTTP_403_FORBIDDEN)
        except NumuwUser.DoesNotExist:
            return Response({
                'error': 'User does not exist'
            },
            status=status.HTTP_404_NOT_FOUND)

        return super().post(request, *args, **kwargs)

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('api/chat-history/', ChatHistoryView.as_view(), name='chat-history'),
    path('api/', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
