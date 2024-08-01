from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.safestring import mark_safe


class NumuwUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ('therapist', 'Therapist'),
        ('patient', 'Patient'),
        ('parent', 'Parent')
    )
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)
    can_login = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Patient(models.Model):
    user = models.OneToOneField(NumuwUser, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user)

class Parent(models.Model):
    user = models.OneToOneField(NumuwUser, on_delete=models.CASCADE)
    patients = models.ManyToManyField(Patient, related_name='parents')

    def __str__(self):
        return str(self.user)

class Therapist(models.Model):
    user = models.OneToOneField(NumuwUser, on_delete=models.CASCADE)
    patients = models.ManyToManyField(Patient, related_name='therapists')

    def __str__(self):
        return str(self.user)

class UserProfile(models.Model):
    user = models.OneToOneField(NumuwUser, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profile_pictures', null=True, blank=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

    def profile_picture_tag(self):
        if self.profile_picture:
            return mark_safe(f'<img src="{self.profile_picture.url}" width="150" height="150" />')
        return "No Image"
    profile_picture_tag.short_description = 'Profile Picture'