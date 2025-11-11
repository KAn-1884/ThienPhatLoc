import { useNavigate, NavLink, Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Avatar,
  IconButton,
  CircularProgress,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from "@mui/icons-material/Article";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import Logo from "../assets/img/logo_TPL.jpeg";
import React, { useEffect, useState } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

function DashboardPage() {
  const navigate = useNavigate();
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const isMobile = useMediaQuery("(max-width:900px)");

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const userName = accounts.length > 0 ? accounts[0].name : "User";
  const userInitials =
    userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  useEffect(() => {
    if (!isAuthenticated && inProgress === "none") {
      navigate("/login");
    }
  }, [isAuthenticated, inProgress, navigate]);

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/login",
    });
  };

  if (inProgress !== "none") {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          bgcolor: "#f4f4f4",
        }}
      >
        <CircularProgress sx={{ color: "#1C5B41" }} />
        <Typography sx={{ mt: 2, color: "#1C5B41", fontWeight: 700 }}>
          Đang tải, vui lòng chờ...
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated) return null;

  const navItems = [
    { label: "Duyệt dự án", to: "approve", icon: <FactCheckOutlinedIcon /> },
    { label: "Danh sách dự án", to: "/", icon: null },
    { label: "Tạo mới", to: "createPage", icon: <AddIcon /> },
    // { label: "Tài liệu", to: "documents", icon: <ArticleIcon /> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: "375px",
        minHeight: "667px",
      }}
    >
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
          {isMobile && (
            <IconButton onClick={handleMenuOpen} sx={{ mr: 1 }}>
              <MenuIcon sx={{ color: "#1C5B41" }} />
            </IconButton>
          )}

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

          {!isMobile && (
            <>
              {navItems.map(({ label, to, icon }) => (
                <NavLink key={to} to={to}>
                  {({ isActive }) => (
                    <Button
                      variant="contained"
                      startIcon={icon}
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
                      {label}
                    </Button>
                  )}
                </NavLink>
              ))}
              <IconButton onClick={handleLogout}>
                <Avatar sx={{ backgroundColor: "#1C5B41" }}>
                  {userInitials}
                </Avatar>
              </IconButton>
            </>
          )}

          {isMobile && (
            <IconButton onClick={handleMenuOpen}>
              <Avatar sx={{ backgroundColor: "#1C5B41" }}>
                {userInitials}
              </Avatar>
            </IconButton>
          )}
        </Toolbar>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {navItems.map((item) => (
            <MenuItem
              key={item.to}
              onClick={() => {
                navigate(item.to);
                handleMenuClose();
              }}
            >
              {item.icon && (
                <Box sx={{ mr: 1, display: "flex" }}>{item.icon}</Box>
              )}
              {item.label}
            </MenuItem>
          ))}
          <MenuItem
            onClick={() => {
              handleLogout();
              handleMenuClose();
            }}
          >
            Đăng xuất
          </MenuItem>
        </Menu>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#f4f6f8",
          padding: { xs: 1.5, md: 3 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardPage;
