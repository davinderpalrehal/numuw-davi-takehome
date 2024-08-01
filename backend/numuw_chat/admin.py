from django.contrib import admin
from accounts.models import Therapist, Parent, Patient, NumuwUser, UserProfile
from numuw_chat.models import Conversation, Message

class NumuwUserAdmin(admin.ModelAdmin):
    list_display = ('user_full_name',)

    def user_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    user_full_name.short_description = 'Name'

class ParentAdmin(admin.ModelAdmin):
    list_display = ('user_full_name',)

    def user_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    user_full_name.short_description = 'Name'

class TherapistAdmin(admin.ModelAdmin):
    list_display = ('user_full_name',)

    def user_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    user_full_name.short_description = 'Name'

class PatientAdmin(admin.ModelAdmin):
    list_display = ('user_full_name',)

    def user_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}"
    user_full_name.short_description = 'Name'

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'profile_picture_tag')
    readonly_fields = ('profile_picture_tag',)

admin.site.register(NumuwUser, NumuwUserAdmin)
admin.site.register(Therapist, TherapistAdmin)
admin.site.register(Parent, ParentAdmin)
admin.site.register(Patient, PatientAdmin)
admin.site.register(Conversation)
admin.site.register(Message)
admin.site.register(UserProfile, UserProfileAdmin)
