from accounts.models import Therapist, Patient, Parent
from django.contrib.auth import get_user_model
from django.core.management import BaseCommand

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with initial data'

    def handle(self, *args, **options):
        # TODO: Add about 4 therapists and 10 patients and 8 parents
        # TODO: Add a few conversations and messages
        if User.objects.count() > 0:
            return
        User.objects.create_superuser('admin', 'admin@localhost', 'admin123')
        therapist_user = User.objects.create_user(username='therapist', password='therapist123', user_type='therapist')
        Therapist.objects.create(user=therapist_user)
        therapist_user.save()

        patient_user = User.objects.create_user(username='patient', password='patient123', user_type='patient')
        patient_user.therapist = therapist_user
        Patient.objects.create(user=patient_user)
        patient_user.save()

        parent_user = User.objects.create_user(username='parent', password='parent123', user_type='parent')
        parent_user.patient = patient_user
        Parent.objects.create(user=parent_user)

        parent_user.save()

        self.stdout.write(self.style.SUCCESS('Successfully seeded the database'))
