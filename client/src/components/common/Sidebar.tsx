import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
} from '@mui/material';
import { Home, Star, BorderColor, AddBoxOutlined, Logout } from '@mui/icons-material';
import assets from 'src/assets';
import { useCommon } from 'src/hooks/useCommon';
import { RootState, useSelector } from 'src/redux/store';
import { Link } from 'react-router-dom';
import { useSidebar } from 'src/hooks/useSidebar';
import { MemoEntity } from 'src/util/memo.type';

export const Sidebar = () => {
  const { selectedMemoId, createMemo } = useSidebar();
  const { allMemos, allFavorites, handlerLogout } = useCommon();
  const userData = useSelector((state: RootState) => state.user.data);

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 250, height: '100vh', position: 'relative', zIndex: 80 }}
    >
      <List sx={{ width: 250, height: '100vh', backgroundColor: assets.colors.secondary }}>
        {/*USER NAME*/}
        <ListItemButton component={Link} to={`/`}>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <Home fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" fontWeight="700">
            {userData.userName}
          </Typography>
        </ListItemButton>

        {/*FAVORITE*/}
        <ListItem sx={{ mt: 2 }}>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <Star fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" fontWeight="700">
            お気に入り
          </Typography>
        </ListItem>

        <Box sx={{ pl: '30px' }}>
          {/*FAVORITE MEMO TITLE*/}
          {0 < allFavorites.length &&
            allFavorites.map((memo: MemoEntity) => (
              <ListItemButton
                component={Link}
                to={`/memo/${memo._id}`}
                key={memo._id}
                selected={memo._id === selectedMemoId}
              >
                <Typography>{`${memo.icon} ${memo.title}`}</Typography>
              </ListItemButton>
            ))}
        </Box>

        {/*Memo*/}
        <ListItem
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Stack direction="row">
            <ListItemIcon sx={{ minWidth: '30px' }}>
              <BorderColor fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2" fontWeight="700">
              メモ
            </Typography>
          </Stack>
        </ListItem>

        <Box sx={{ pl: '30px' }}>
          {/*NEW CREATE*/}
          <ListItemButton onClick={createMemo}>
            <ListItemIcon sx={{ minWidth: 'auto', mr: '2px' }}>
              <AddBoxOutlined fontSize="small" />
            </ListItemIcon>
            <Typography>新規作成</Typography>
          </ListItemButton>

          {/*MEMO TITLE*/}
          {0 < allMemos.length &&
            allMemos.map((memo: MemoEntity) => (
              <ListItemButton
                component={Link}
                to={`/memo/${memo._id}`}
                key={memo._id}
                selected={memo._id === selectedMemoId}
              >
                <Typography>{`${memo.icon} ${memo.title}`}</Typography>
              </ListItemButton>
            ))}
        </Box>

        {/*LOGOUT*/}
        <ListItemButton onClick={handlerLogout}>
          <ListItemIcon sx={{ minWidth: '30px' }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2" fontWeight="700">
            ログアウト
          </Typography>
        </ListItemButton>
      </List>
    </Drawer>
  );
};
