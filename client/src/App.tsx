import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./components/layouts/AuthLayout";
import { AppLayout } from "src/components/layouts/AppLayout";
import { Login } from "src/pages/Login";
import { Register } from "src/pages/Register";
import { Home } from "src/pages/Home";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { blue } from "@mui/material/colors";

function App() {
  const theme = createTheme({
    palette: { primary: blue },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="memo" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
