import { Box, IconButton, TextField } from '@mui/material';
import { DeleteOutline, Star, StarBorderOutlined } from '@mui/icons-material';
import { useMemoHook } from 'src/hooks/useMemo';
import { styles } from 'src/assets/css/memoStyles';
import { EmojiPicker } from 'src/components/common/EmojiPicker';

export const Memo = () => {
  const { isFavorite, memoData, updateMemo, deleteMemo, updateFavorite } = useMemoHook();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <IconButton onClick={updateFavorite}>
          {isFavorite ? <Star /> : <StarBorderOutlined />}
        </IconButton>
        <IconButton color="error" onClick={deleteMemo}>
          <DeleteOutline />
        </IconButton>
      </Box>
      <Box sx={{ p: '10px 50px' }}>
        <EmojiPicker memoData={memoData} />
        <TextField
          placeholder="無題"
          value={memoData ? memoData.title : ''}
          onChange={(e) => updateMemo('title', e)}
          variant="outlined"
          fullWidth
          sx={styles.titleField}
        />
        <TextField
          placeholder="追加"
          value={memoData ? memoData.description : ''}
          onChange={(e) => updateMemo('description', e)}
          variant="outlined"
          fullWidth
          sx={styles.textField}
          multiline
        />
      </Box>
    </>
  );
};
