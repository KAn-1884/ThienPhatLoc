import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Logo from "../assets/img/logo_TPL.jpeg";
import ProjectCard from "../components/ProjectCard.jsx";
import Status from "../components/Status.jsx";
import { Outlet } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };
  const handleCreateCard = () => {
    navigate("createCard");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar
        position="static"
        elevation={1}
        sx={{
          backgroundColor: "#FFF",
          color: "#333",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <Toolbar>
          <Box
            component="img"
            src={Logo}
            alt="TPL Logo"
            sx={{ width: 40, height: 40, mr: 1.5 }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Thiên Phát Lộc E&C
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#1C5B41",
              "&:hover": { backgroundColor: "#154A32" },
              mr: 2,
              textTransform: "none",
              borderRadius: "8px",
            }}
            onClick={handleCreateCard}
          >
            Tạo mới
          </Button>
          <Button
            variant="outlined"
            sx={{
              mr: 2,
              textTransform: "none",
              borderRadius: "8px",
              borderColor: "#1C5B41",
              color: "#1C5B41",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Danh sách
          </Button>
          <IconButton onClick={handleLogout}>
            <Avatar sx={{ backgroundColor: "#1C5B41" }}>Out</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#f4f6f8",
          padding: 3,
          textAlign: "center",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardPage;
