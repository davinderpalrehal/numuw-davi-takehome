from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from accounts.models import NumuwUser
from . import settings
from .views import (
    ConversationViewSet,
    MessageViewSet,
    ChatHistoryView,
    TherapistPatientsView, StartConversationView, RequestConversationView, ConversationListView,
)
from accounts.views import UserDetailView


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")

        try:
            user = NumuwUser.objects.get(username=username)
            if not user.can_login:
                return Response(
                    {"error": "User is not allowed to login"},
                    status=status.HTTP_403_FORBIDDEN,
                )
        except NumuwUser.DoesNotExist:
            return Response(
                {"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

        return super().post(request, *args, **kwargs)


router = routers.DefaultRouter()
router.register(r"conversations", ConversationViewSet)
router.register(r"messages", MessageViewSet)
router.register(r"chat-history", ChatHistoryView, basename="chat-history")

urlpatterns = [
    path("api/token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("admin/", admin.site.urls),
    re_path(
        r"^api/user-details/(?P<user_id>\d+)?$",
        UserDetailView.as_view(),
        name="user-details",
    ),
    path("api/fetch-patients/", TherapistPatientsView.as_view(), name="fetch-patients"),
    path('api/start-conversation/', StartConversationView.as_view(), name='start-conversation'),
    path('api/request-conversation/', RequestConversationView.as_view(), name='request-conversation'),
    path('api/conversations/', ConversationListView.as_view(), name='conversation-list'),
    path("api/", include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
