import { FormEvent, useState } from 'react';
import AuthApi, { LoginUserType, RegisterUserType } from 'src/api/AuthApi';
import { AxiosError } from 'axios';
import { ErrorResponse } from 'src/types/responseError';
import { useNavigate } from 'react-router-dom';

const useFormActions = () => {
  const navigate = useNavigate();

  const [emailErrText, setEmailErrText] = useState<string>('');
  const [userNameErrText, setUserNameErrText] = useState<string>('');
  const [passwordErrText, setPasswordErrText] = useState<string>('');
  const [confirmErrText, setConfirmErrText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Form register submit handler
  const handlerRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isError = false;
    setEmailErrText('');
    setUserNameErrText('');
    setPasswordErrText('');
    setConfirmErrText('');

    const data = new FormData(e.target as HTMLFormElement);
    const email = data.get('email') as string | null;
    const userName = data.get('userName') as string | null;
    const password = data.get('password') as string | null;
    const confirmPassword = data.get('confirmPassword') as string | null;

    if (email === '') {
      isError = true;
      setEmailErrText('Emailを入力してください');
    }
    if (userName === '') {
      isError = true;
      setUserNameErrText('名前を入力してください');
    }
    if (password === '') {
      isError = true;
      setPasswordErrText('パスワードを入力してください');
    }
    if (confirmPassword === '') {
      isError = true;
      setConfirmErrText('確認用パスワードを入力してください');
    }
    if (password !== confirmPassword) {
      isError = true;
      setConfirmErrText('パスワードと確認用パスワードが異なります');
    }
    if (isError) return;
    setLoading(true);

    // Set params
    const requestParams: RegisterUserType = {
      email: email ? email.trim() : null,
      userName: userName ? userName.trim() : null,
      password: password ? password.trim() : null,
      confirmPassword: confirmPassword ? confirmPassword.trim() : null,
    };

    // Request api
    try {
      const res = await AuthApi.register(requestParams);
      localStorage.setItem('token', res.data.token);
      setLoading(false);
      console.log('Register successful');

      navigate('/');
    } catch (error) {
      const errs = (error as AxiosError<ErrorResponse>).response?.data?.errors;
      errs?.forEach((err) => {
        if (err.path === 'email') setEmailErrText(err.msg);
        if (err.path === 'userName') setUserNameErrText(err.msg);
        if (err.path === 'password') setPasswordErrText(err.msg);
        if (err.path === 'confirmPassword') setConfirmErrText(err.msg);
      });

      setLoading(false);
      console.log(error);
    }
  };

  // Form login submit handler
  const handlerLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isError = false;
    setEmailErrText('');
    setPasswordErrText('');

    const data = new FormData(e.target as HTMLFormElement);
    const email = data.get('email') as string | null;
    const password = data.get('password') as string | null;

    if (email === '') {
      isError = true;
      setEmailErrText('Emailを入力してください');
    }
    if (password === '') {
      isError = true;
      setPasswordErrText('パスワードを入力してください');
    }
    if (isError) return;
    setLoading(true);

    // Set params
    const requestParams: LoginUserType = {
      email: email ? email.trim() : null,
      password: password ? password.trim() : null,
    };

    // Request api
    try {
      const res = await AuthApi.login(requestParams);
      localStorage.setItem('token', res.data.token);
      setLoading(false);
      console.log('Login successful');

      navigate('/');
    } catch (error) {
      const errs = (error as AxiosError<ErrorResponse>).response?.data?.errors;
      errs?.forEach((err) => {
        if (err.path === 'email') setEmailErrText(err.msg);
        if (err.path === 'userName') setUserNameErrText(err.msg);
        if (err.path === 'password') setPasswordErrText(err.msg);
        if (err.path === 'confirmPassword') setConfirmErrText(err.msg);
      });

      setLoading(false);
      console.log(error);
    }
  };

  return {
    handlerRegisterSubmit,
    handlerLoginSubmit,
    emailErrText,
    userNameErrText,
    passwordErrText,
    confirmErrText,
    loading,
  };
};
export default useFormActions;
