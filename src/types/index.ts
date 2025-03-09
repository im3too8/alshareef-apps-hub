
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

export interface FileUploadResult {
  url: string;
  name: string;
  size: number;
}
