import { Grid, ListItemButton, Typography } from '@mui/material';
import { MemoEntity } from 'src/util/memo.type';
import dayjs from 'dayjs';
import { AccessTime } from '@mui/icons-material';
import { Link } from 'react-router-dom';

type ListButtonProps = {
  memoList: MemoEntity[];
};

export const ListButtons: React.FC<ListButtonProps> = ({ memoList }) => {
  return (
    <>
      {memoList.map((memo: MemoEntity, index: number) => (
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
    </>
  );
};
