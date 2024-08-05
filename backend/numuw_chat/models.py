from django.contrib.auth.models import User
from django.db import models

from accounts.models import Therapist, Parent, NumuwUser
from numuw_chat import settings


class Conversation(models.Model):
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('closed', 'Closed'),
        ('pending', 'Pending')
    ]
    therapist = models.ForeignKey(
        NumuwUser,
        related_name='therapist_conversations',
        on_delete=models.CASCADE,
        limit_choices_to={'user_type': 'therapist'}
    )
    parent = models.ForeignKey(
        NumuwUser,
        related_name='parent_conversations',
        on_delete=models.CASCADE,
        limit_choices_to={'user_type': 'parent'}
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending'
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