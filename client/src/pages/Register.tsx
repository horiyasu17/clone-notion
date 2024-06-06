import { FormEvent } from "react";
import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import AuthApi, { RegisterUserType } from "src/api/AuthApi";

export const Register = () => {
  // Form submit handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);
    const email = data.get("email") as string | null;
    const userName = data.get("userName") as string | null;
    const password = data.get("password") as string | null;
    const confirmPassword = data.get("confirmPassword") as string | null;

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
      console.log(res);
      // localStorage.setItem("token", res.data.token);
      console.log("Register successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="email"
          label="Email"
          name="email"
          type="email"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          id="userName"
          label="お名前"
          name="userName"
          type="text"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          name="password"
          type="password"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          name="confirmPassword"
          type="password"
          margin="normal"
          required
        />
        <LoadingButton
          fullWidth
          type="submit"
          loading={false}
          sx={{ mt: 3, mb: 2 }}
          children="アカウント作成"
        />
      </Box>
      <Button
        fullWidth
        component={Link}
        to="/login"
        children="既にアカウントを持っていますか？"
      />
    </>
  );
};
