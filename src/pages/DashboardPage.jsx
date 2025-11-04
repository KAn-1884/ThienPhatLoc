import { useNavigate, NavLink, Outlet } from "react-router-dom";
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
import ArticleIcon from "@mui/icons-material/Article"; // === 1. THÊM IMPORT ICON ===

function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
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

          <NavLink to="createPage">
            {({ isActive }) => (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  mr: 2,
                  textTransform: "none",
                  borderRadius: "8px",
                  borderColor: "#1C5B41",
                  backgroundColor: isActive ? "#1C5B41" : "#fff",
                  color: isActive ? "#fff" : "#1C5B41",
                  "&:hover": {
                    backgroundColor: isActive ? "#154A32" : "#f0f0f0",
                  },
                }}
              >
                Tạo mới
              </Button>
            )}
          </NavLink>

          {/* (Giữ nguyên code của bạn) */}
          <NavLink to="/">
            {({ isActive }) => (
              <Button
                variant="contained"
                sx={{
                  mr: 2,
                  textTransform: "none",
                  borderRadius: "8px",
                  borderColor: "#1C5B41",
                  backgroundColor: isActive ? "#1C5B41" : "#fff",
                  color: isActive ? "#fff" : "#1C5B41",
                  "&:hover": {
                    backgroundColor: isActive ? "#154A32" : "#f0f0f0",
                  },
                }}
              >
                Danh sách
              </Button>
            )}
          </NavLink>

          {/* === 2. THÊM NÚT "TÀI LIỆU" MỚI === */}
          <NavLink to="documents">
            {({ isActive }) => (
              <Button
                variant="contained"
                startIcon={<ArticleIcon />}
                sx={{
                  mr: 2,
                  textTransform: "none",
                  borderRadius: "8px",
                  borderColor: "#1C5B41",
                  backgroundColor: isActive ? "#1C5B41" : "#fff",
                  color: isActive ? "#fff" : "#1C5B41",
                  "&:hover": {
                    backgroundColor: isActive ? "#154A32" : "#f0f0f0",
                  },
                }}
              >
                Tài liệu
              </Button>
            )}
          </NavLink>
          {/* ================================== */}

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
