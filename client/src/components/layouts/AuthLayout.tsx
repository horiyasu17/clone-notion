import { Box, Container } from "@mui/material";
import notionLogo from "src/assets/images/notion-logo.png";

export const AuthLayout = () => {
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
        <img
          src={notionLogo}
          alt="logo"
          style={{ width: 100, height: 100, marginBottom: 3 }}
        />
        Notion Clone
      </Box>
    </Container>
  );
};
