import { Box, Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material';
import { AddBoxOutlined, LogoutOutlined } from '@mui/icons-material';
import assets from 'src/assets';
import { useCommon } from 'src/hooks/useCommon';
import { RootState, useSelector } from 'src/redux/store';
import { Link } from 'react-router-dom';
import { useSidebar } from 'src/hooks/useSidebar';
import { MemoEntity } from 'src/api/memoApi';

export const Sidebar = () => {
  const { selectedMemoId } = useSidebar();
  const { handlerLogout } = useCommon();
  const userData = useSelector((state: RootState) => state.user.data);
  const allMemoData = useSelector((state: RootState) => state.memo.data);

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: '100vh' }}
    >
      <List sx={{ width: 250, height: '100vh', backgroundColor: assets.colors.secondary }}>
        {/*ユーザーネーム(ホーム)*/}
        <ListItemButton component={Link} to={`/`}>
          <Box
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
          </Box>
        </ListItemButton>
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
          <IconButton>
            <AddBoxOutlined fontSize="small" />
          </IconButton>
        </ListItemButton>

        {/*メモ出力*/}
        {0 < allMemoData.length &&
          allMemoData.map((memo: MemoEntity) => (
            <ListItemButton
              component={Link}
              to={`/memo/${memo._id}`}
              key={memo._id}
              selected={memo._id === selectedMemoId}
            >
              <Box sx={{ pl: '20px' }}>
                <Typography>無題</Typography>
              </Box>
            </ListItemButton>
          ))}

        {/*ログアウト*/}
        <ListItemButton onClick={handlerLogout}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography variant="body2" fontWeight="700">
              ログアウト
            </Typography>
            <LogoutOutlined sx={{ ml: 2 }} />
          </Box>
        </ListItemButton>
      </List>
    </Drawer>
  );
};
