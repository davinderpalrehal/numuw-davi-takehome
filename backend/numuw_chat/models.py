from django.contrib.auth.models import User
from django.db import models
from numuw_chat import settings


class Conversation(models.Model):
    therapist = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='therapist_conversations',
        on_delete=models.CASCADE
    )
    parent = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='parent_conversations',
        on_delete=models.CASCADE
    )
    status = models.CharField(
        max_length=10,
        choices=[
            ('open', 'Open'),
            ('closed', 'Closed'),
        ]
    )


class Message(models.Model):
    conversation = models.ForeignKey(
        Conversation,
        related_name='messages',
        on_delete=models.CASCADE
    )
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    media = models.FileField(upload_to='media', null=True, blank=True)