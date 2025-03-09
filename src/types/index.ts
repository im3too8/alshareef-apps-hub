
export interface Application {
  id: string;
  name: string;
  description: string;
  link: string;
  imageUrl: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}
