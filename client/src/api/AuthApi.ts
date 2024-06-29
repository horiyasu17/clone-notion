import axiosClient from 'src/api/axiosClient';
import {
  LoginUserType,
  RegisterUserType,
  ResponseUser,
  ResponseUserToken,
} from 'src/types/auth.type';

const authApi = {
  register: (params: RegisterUserType): Promise<{ data: ResponseUserToken }> =>
    axiosClient.post('auth/register', params),
  login: (params: LoginUserType): Promise<{ data: ResponseUserToken }> =>
    axiosClient.post('auth/login', params),
  verifyToken: (): Promise<{ data: ResponseUser }> => axiosClient.post('auth/verify-token'),
};

export default authApi;
