import { Box, Container } from "@mui/material";
import notionLogo from "src/assets/images/notion-logo.png";
import { Outlet } from "react-router-dom";
import { useAuthorization } from "src/hooks/useAuthorization";

export const AuthLayout = () => {
  // check token
  useAuthorization();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 6,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img src={notionLogo} alt="logo" style={{ width: 100, height: 100, marginBottom: 3 }} />
        Notion Clone
      </Box>
      <Outlet />
    </Container>
  );
};
