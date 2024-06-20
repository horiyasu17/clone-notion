import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useHome } from 'src/hooks/useHome';

export const Home = () => {
  const { handlerCreateMemo } = useHome();

  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <LoadingButton variant="outlined" onClick={handlerCreateMemo} children="最初のメモを作成" />
    </Box>
  );
};
