import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import useFormActions from 'src/hooks/useFormActions';

export const Register: React.FC = () => {
  // Form Actions
  const {
    handlerRegisterSubmit,
    emailErrText,
    userNameErrText,
    passwordErrText,
    confirmErrText,
    loading,
  } = useFormActions();

  return (
    <>
      <Box component="form" onSubmit={handlerRegisterSubmit} noValidate>
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
          id="userName"
          label="お名前"
          name="userName"
          type="text"
          margin="normal"
          required
          helperText={userNameErrText}
          error={!!userNameErrText}
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
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          name="confirmPassword"
          type="password"
          margin="normal"
          required
          helperText={confirmErrText}
          error={!!confirmErrText}
          disabled={loading}
        />
        <LoadingButton
          fullWidth
          type="submit"
          loading={loading}
          sx={{ mt: 3, mb: 2 }}
          children="アカウント作成"
        />
      </Box>
      <Button fullWidth component={Link} to="/login" children="既にアカウントを持っていますか？" />
    </>
  );
};
