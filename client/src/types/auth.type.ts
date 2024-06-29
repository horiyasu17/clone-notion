export type RegisterUserType = {
  email: string | null;
  userName: string | null;
  password: string | null;
  confirmPassword: string | null;
};

export type LoginUserType = {
  email: string | null;
  password: string | null;
};

export type UserEntity = {
  email: string;
  userName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ResponseUserToken = {
  user: UserEntity;
  token: string;
};

export type ResponseUser = {
  user: UserEntity;
};
