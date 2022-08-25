export type Role = 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_MODERATOR' | ['user'];

export interface User {
  email?: string;
  password: string;
  username: string;
  role?: Role;
}
