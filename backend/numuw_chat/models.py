from django.contrib.auth.models import User
from django.db import models

from accounts.models import Therapist, Parent, NumuwUser
from numuw_chat import settings


class Conversation(models.Model):
    therapist = models.ForeignKey(
        NumuwUser,
        related_name='therapist_conversations',
        on_delete=models.CASCADE
    )
    parent = models.ForeignKey(
        NumuwUser,
        related_name='parent_conversations',
        on_delete=models.CASCADE
    )
    status = models.CharField(
        max_length=10,
        choices=[
            ('open', 'Open'),
            ('closed', 'Closed'),
            ('pending', 'Pending')
        ]
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Conversation between {self.therapist.username} and {self.parent.username}'


class Message(models.Model):
    conversation = models.ForeignKey(
        Conversation,
        related_name='messages',
        on_delete=models.CASCADE
    )
    sender = models.ForeignKey(
        NumuwUser,
        related_name='messages',
        on_delete=models.CASCADE
    )
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    media = models.FileField(upload_to='media', null=True, blank=True)

    class Meta:
        ordering = ['-timestamp']