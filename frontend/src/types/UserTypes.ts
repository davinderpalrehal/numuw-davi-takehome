export enum UserType {
  Therapist = 'therapist',
  Patient = 'patient',
  Parent = 'parent',
}
export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  user_type: UserType;
  profile_picture: string;
}
