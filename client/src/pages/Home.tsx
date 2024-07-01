import { Box, Button, List, Typography } from '@mui/material';
import { useCommon } from 'src/hooks/useCommon';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import { ListButtons } from 'src/components/common/ListButtons';

//localization
dayjs.locale(ja);

export const Home = () => {
  const { allMemos, allFavorites, allMemoData, createMemo } = useCommon();

  return (
    <>
      <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 5 }} children={'Home'} />

      {/*Empty memo*/}
      {allMemoData.length === 0 && (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ mb: 3 }} children={'はじめてのメモを作成しよう'} />
          <Button variant="outlined" onClick={createMemo} children="最初のメモを作成" />
        </Box>
      )}

      {/*Favorite memo list*/}
      {allFavorites.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }} children={'お気に入り'} />
          <List>
            <ListButtons memoList={allFavorites} />
          </List>
        </Box>
      )}

      {/*Memo list*/}
      {allMemos.length > 0 && (
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }} children={'メモ'} />
          <List>
            <ListButtons memoList={allMemos} />
          </List>
        </Box>
      )}
    </>
  );
};
