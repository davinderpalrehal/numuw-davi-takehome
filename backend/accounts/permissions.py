from rest_framework.permissions import BasePermission


class IsTherapistOrParent(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        return request.user.is_authenticated and request.user.user_type in ['therapist', 'parent']