from django.contrib import admin

from numuw_chat.models import Conversation, Message

admin.site.register(Conversation)
admin.site.register(Message)