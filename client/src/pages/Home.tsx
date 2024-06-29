import { Box, Button, Grid, List, ListItemButton, Typography } from '@mui/material';
import { useCommon } from 'src/hooks/useCommon';
import { RootState, useSelector } from 'src/redux/store';
import { MemoEntity } from 'src/api/memoApi';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import { AccessTime } from '@mui/icons-material';
import { Link } from 'react-router-dom';

//localization
dayjs.locale(ja);

export const Home = () => {
  const { createMemo } = useCommon();
  const allMemoData = useSelector((state: RootState) => state.memo.allData);

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

      {/*Memo list*/}
      {allMemoData.length > 0 && (
        <List>
          {allMemoData.map((memo: MemoEntity, index: number) => (
            <ListItemButton
              key={index}
              component={Link}
              to={`/memo/${memo._id}`}
              sx={{
                borderTop: index === 0 ? '1px solid #bbb' : 'none',
                borderBottom: '1px solid #bbb',
                py: '10px',
              }}
            >
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography children={`${memo.icon} ${memo.title}`} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
                >
                  <AccessTime fontSize="small" sx={{ mr: 1 }} />
                  <Typography children={dayjs(memo.updatedAt).format('YYYY/MM/DD HH:mm:ss')} />
                </Grid>
              </Grid>
            </ListItemButton>
          ))}
        </List>
      )}
    </>
  );
};
