import { Role } from './user.data';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  roles: Role;
  accessToken: string;
  tokenType: string;
}
