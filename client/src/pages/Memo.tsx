import { Box, IconButton, TextField } from '@mui/material';
import { DeleteOutline, StarBorderOutlined } from '@mui/icons-material';

export const Memo = () => {
  const styles = {
    titleField: {
      '.MuiOutlinedInput-notchedOutline': { border: 'none' },
      '.MuiInputBase-root': { fontSize: '2rem', fontWeight: 700 },
      '.MuiInputBase-input': { p: 0 },
    },
    textField: {
      '.MuiOutlinedInput-notchedOutline': { border: 'none' },
      '.MuiInputBase-root': { fontSize: '1rem' },
      '.MuiOutlinedInput-root': { p: 0 },
      '.MuiInputBase-input': { p: 0 },
    },
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton>
          <StarBorderOutlined />
        </IconButton>
        <IconButton color="error">
          <DeleteOutline />
        </IconButton>
      </Box>
      <Box sx={{ p: '10px 50px' }}>
        <TextField placeholder="無題" variant="outlined" fullWidth sx={styles.titleField} />
        <TextField
          placeholder="追加"
          variant="outlined"
          fullWidth
          sx={styles.textField}
          multiline
        />
      </Box>
    </>
  );
};
