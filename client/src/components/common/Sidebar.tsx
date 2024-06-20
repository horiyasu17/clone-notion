import { Box, Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material';
import { Home, AddBoxOutlined, Logout } from '@mui/icons-material';
import assets from 'src/assets';
import { useCommon } from 'src/hooks/useCommon';
import { RootState, useSelector } from 'src/redux/store';
import { Link } from 'react-router-dom';
import { useSidebar } from 'src/hooks/useSidebar';
import { MemoEntity } from 'src/api/memoApi';

export const Sidebar = () => {
  const { selectedMemoId, createMemo } = useSidebar();
  const { handlerLogout } = useCommon();
  const userData = useSelector((state: RootState) => state.user.data);
  const allMemoData = useSelector((state: RootState) => state.memo.allData);

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: '100vh', position: 'relative', zIndex: 80 }}
    >
      <List sx={{ width: 250, height: '100vh', backgroundColor: assets.colors.secondary }}>
        {/*USER NAME*/}
        <ListItemButton
          component={Link}
          to={`/`}
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" fontWeight="700">
            {userData.userName}
          </Typography>
          <IconButton>
            <Home fontSize="small" />
          </IconButton>
        </ListItemButton>

        {/*FAVORITE*/}
        <ListItemButton
          sx={{
            width: '100%',
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" fontWeight="700">
            お気に入り
          </Typography>
        </ListItemButton>

        {/*PRIVATE*/}
        <ListItemButton
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" fontWeight="700">
            プライベート
          </Typography>
          <IconButton onClick={createMemo}>
            <AddBoxOutlined fontSize="small" />
          </IconButton>
        </ListItemButton>

        {/*MEMO TITLE*/}
        {0 < allMemoData.length &&
          allMemoData.map((memo: MemoEntity) => (
            <ListItemButton
              component={Link}
              to={`/memo/${memo._id}`}
              key={memo._id}
              selected={memo._id === selectedMemoId}
            >
              <Box sx={{ pl: '15px' }}>
                <Typography>{`${memo.icon} ${memo.title}`}</Typography>
              </Box>
            </ListItemButton>
          ))}

        {/*LOGOUT*/}
        <ListItemButton
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onClick={handlerLogout}
        >
          <Typography variant="body2" fontWeight="700">
            ログアウト
          </Typography>
          <IconButton>
            <Logout fontSize="small" />
          </IconButton>
        </ListItemButton>
      </List>
    </Drawer>
  );
};
