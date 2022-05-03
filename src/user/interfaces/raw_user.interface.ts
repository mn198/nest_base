export interface IRawUser {
  _id: string;
  provider: string;
  providerId: string;
  username: string;
  password: string;
  displayName: string;
  email: string;
  picture: string;
  photos: string[];
}
