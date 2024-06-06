import axiosClient from "src/api/axiosClient";

export type RegisterUserType = {
  email: string | null;
  userName: string | null;
  password: string | null;
  confirmPassword: string | null;
};

const authApi = {
  register: (params: RegisterUserType) => {
    return axiosClient.post("auth/register", params);
  },
};

export default authApi;
