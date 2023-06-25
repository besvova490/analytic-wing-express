export interface UserProfileBase {
  id: number;
  email: string;
}

export default interface UserProfile extends UserProfileBase {
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
