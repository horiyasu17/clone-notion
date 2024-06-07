import axiosClient from "src/api/axiosClient";

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

const authApi = {
  register: (params: RegisterUserType) => {
    return axiosClient.post("auth/register", params);
  },
  login: (params: LoginUserType) => {
    return axiosClient.post("auth/login", params);
  },
};

export default authApi;
