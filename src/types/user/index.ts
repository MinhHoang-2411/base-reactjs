export interface ResponseLoginAdmin {
  data: {
    token: string;
    user: CurrentUser;
  };
  status?: number;
  statusText?: string;
}

export interface CurrentUser {
  email: string;
  id: number;
  name: string;
}

export interface User {
  email: string;
  id: number;
  name: string;
  is_active: boolean;
}
