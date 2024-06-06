import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <>
      <Box component="form">
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
          id="username"
          label="お名前"
          name="username"
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
