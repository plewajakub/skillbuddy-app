export interface User {
  uid: string;
  email: string;
  login?: string;
  password?: string;
  lastSeen?: Date;
  photoURL?: string;
}
