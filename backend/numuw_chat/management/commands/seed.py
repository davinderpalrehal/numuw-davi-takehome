import random

from accounts.models import Therapist, Patient, Parent, NumuwUser, UserProfile
from django.contrib.auth import get_user_model
from django.core.management import BaseCommand

from numuw_chat.models import Conversation, Message

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with initial data'

    def handle(self, *args, **options):
        if User.objects.count() > 0:
            return

        # Adding admin user
        User.objects.create_superuser(
            username='admin',
            email='admin@localhost',
            password='admin123',
            user_type='therapist',
            first_name='Admin',
            last_name='User',
            can_login=True
        )
        UserProfile.objects.create(user=User.objects.get(username='admin'), profile_picture="profile_pictures/admin_picture.jpg")

        # Adding therapists
        therapist_users = []
        therapist_names = [
            ('Aarav', 'Sharma'),
            ('Omar', 'Hussein'),
            ('Aisha', 'Khalid'),
            ('Sneha', 'Iyer'),
        ]
        for f_name, l_name in therapist_names:
            curr_user = NumuwUser.objects.create_user(
                username=f'{f_name.lower()}{l_name.lower()}',
                email=f'{f_name.lower()}{l_name.lower()}@localhost',
                password='therapist123',
                user_type='therapist',
                first_name=f_name,
                last_name=l_name,
                can_login=True
            )
            curr_user.save()
            Therapist.objects.create(user=curr_user)
            UserProfile.objects.create(user=curr_user, profile_picture=f'profile_pictures/{f_name.lower()}_{l_name.lower()}.jpg')
            therapist_users.append(curr_user)

        # Adding patients
        patient_users = []
        patient_names = [
            ('Ananya', 'Gupta'),
            ('Rohan', 'Mehta'),
            ('Ahmed', 'Al-Farsi'),
            ('Fatima', 'Zayed'),
            ('Priya', 'Kapoor'),
            ('Vikram', 'Singh'),
            ('Hassan', 'Ali'),
            ('Layla', 'Saeed'),
            ('Aishwarya', 'Rao'),
            ('Yusuf', 'Rahman'),
        ]
        for f_name, l_name in patient_names:
            curr_user = NumuwUser.objects.create_user(
                username=f'{f_name.lower()}{l_name.lower()}',
                email=f'{f_name.lower()}{l_name.lower()}@localhost',
                password='patient123',
                user_type='patient',
                first_name=f_name,
                last_name=l_name,
                can_login=False
            )
            curr_user.save()
            Patient.objects.create(user=curr_user)
            UserProfile.objects.create(user=curr_user, profile_picture=f'profile_pictures/{f_name.lower()}_{l_name.lower()}.jpg')
            patient_users.append(curr_user)

        # Adding parents
        parent_users = []
        parent_names = [
            ('Karan', 'Patel'),
            ('Arjun', 'Nair'),
            ('Meera', 'Desai'),
            ('Raj', 'Verma'),
            ('Zara', 'Ahmed'),
            ('Ali', 'Hassan'),
            ('Noor', 'Jamil'),
            ('Ibrahim', 'Mustafa'),
        ]
        for f_name, l_name in parent_names:
            curr_user = NumuwUser.objects.create_user(
                username=f'{f_name.lower()}{l_name.lower()}',
                email=f'{f_name.lower()}{l_name.lower()}@localhost',
                password='parent123',
                user_type='parent',
                first_name=f_name,
                last_name=l_name,
                can_login=True,
            )
            curr_user.save()
            Parent.objects.create(user=curr_user)
            UserProfile.objects.create(user=curr_user, profile_picture=f'profile_pictures/{f_name.lower()}_{l_name.lower()}.jpg')
            parent_users.append(curr_user)

        # Assign patients to therapists
        num_therapists = len(therapist_users)
        for i, patient_user in enumerate(patient_users):
            therapist_user = therapist_users[i % num_therapists]
            therapist = Therapist.objects.get(user=therapist_user)
            patient = Patient.objects.get(user=patient_user)
            therapist.patients.add(patient)
            therapist.save()

        for patient_user in patient_users[num_therapists:]:
            therapist_user = random.choice(therapist_users)
            therapist = Therapist.objects.get(user=therapist_user)
            patient = Patient.objects.get(user=patient_user)
            therapist.patients.add(patient)
            therapist.save()

        # Assign patients to parents
        for patient_user in patient_users:
            parent_user = random.choice(parent_users)
            parent = Parent.objects.get(user=parent_user)
            patient = Patient.objects.get(user=patient_user)
            parent.patients.add(patient)
            parent.save()

        # Adding conversations and messages
        for parent in parent_users:
            therapist = random.choice(therapist_users)
            conversation = Conversation.objects.create(
                therapist=therapist,
                parent=parent,
                status='open'
            )
            messages = [
                {
                    'sender': therapist,
                    'content': 'Hello, how can I help you today?',
                },
                {
                    'sender': parent,
                    'content': 'I have some concerns about my child.',
                },
                {
                    'sender': therapist,
                    'content': 'Can you please provide more details?',
                },
            ]
            for message in messages:
                Message.objects.create(
                    conversation=conversation,
                    sender=message['sender'],
                    content=message['content']
                )

        self.stdout.write(self.style.SUCCESS('Successfully seeded the database'))
