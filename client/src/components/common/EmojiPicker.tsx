import React from 'react';
import { Box, Typography } from '@mui/material';
import { MemoEntity } from 'src/api/memoApi';
import Picker from '@emoji-mart/react';
import { useEmojiPicker } from 'src/hooks/useEmojiPicker';

type EmojiPickerProps = {
  memoData: MemoEntity | null;
};

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ memoData }) => {
  const { isShowEmojiPicker, selectedMemoData, showEmojiPicker, selectedEmoji } =
    useEmojiPicker(memoData);

  return (
    <Box>
      {selectedMemoData && (
        <Typography
          variant="h3"
          children={selectedMemoData.icon}
          onClick={showEmojiPicker}
          sx={{ cursor: 'pointer' }}
        />
      )}
      <Box
        sx={{ display: isShowEmojiPicker ? 'block' : 'none', position: 'absolute', zIndex: 100 }}
      >
        <Picker onEmojiSelect={selectedEmoji} />
      </Box>
      <Box
        sx={{
          display: isShowEmojiPicker ? 'block' : 'none',
          position: 'fixed',
          left: 0,
          top: 0,
          zIndex: 90,
          width: '100%',
          height: '100%',
        }}
        onClick={showEmojiPicker}
      />
    </Box>
  );
};
