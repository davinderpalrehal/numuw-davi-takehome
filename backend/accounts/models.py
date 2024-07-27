from django.contrib.auth.models import AbstractUser
from django.db import models

class NumuwUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ('therapist', 'Therapist'),
        ('patient', 'Patient'),
        ('parent', 'Parent')
    )
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)


class Patient(models.Model):
    user = models.OneToOneField(NumuwUser, on_delete=models.CASCADE)
    can_login = models.BooleanField(default=False)


class Parent(models.Model):
    user = models.OneToOneField(NumuwUser, on_delete=models.CASCADE)
    patients = models.ManyToManyField(Patient,  related_name='parents')
    can_login = models.BooleanField(default=True)


class Therapist(models.Model):
    user = models.OneToOneField(NumuwUser, on_delete=models.CASCADE)
    patients = models.ManyToManyField(Patient, related_name='therapists')
    can_login = models.BooleanField(default=True)
