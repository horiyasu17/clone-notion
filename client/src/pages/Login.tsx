import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import useFormActions from "src/hooks/useFormActions";

export const Login: React.FC = () => {
  // Form Actions
  const { handleLoginSubmit, emailErrText, passwordErrText, loading } =
    useFormActions();

  return (
    <>
      <Box component="form" onSubmit={handleLoginSubmit} noValidate>
        <TextField
          fullWidth
          id="email"
          label="Email"
          name="email"
          type="email"
          margin="normal"
          required
          helperText={emailErrText}
          error={!!emailErrText}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          name="password"
          type="password"
          margin="normal"
          required
          helperText={passwordErrText}
          error={!!passwordErrText}
          disabled={loading}
        />
        <LoadingButton
          fullWidth
          type="submit"
          loading={loading}
          sx={{ mt: 3, mb: 2 }}
          children="ログイン"
        />
      </Box>
      <Button
        fullWidth
        component={Link}
        to="/register"
        children="アカウントを持っていませんか？"
      />
    </>
  );
};
