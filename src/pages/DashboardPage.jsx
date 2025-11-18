import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
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
  Badge,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

import Logo from "../assets/img/logo_TPL.jpeg";
import { projectData } from "../data/projectData";

function DashboardPage() {
  // ... (Tất cả logic state và
  //      function handlers của bạn giữ nguyên) ...
  const navigate = useNavigate();
  const location = useLocation();
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const isMobile = useMediaQuery("(max-width:900px)");
  const [mobileNavAnchorEl, setMobileNavAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const handleMobileNavOpen = (e) => setMobileNavAnchorEl(e.currentTarget);
  const handleMobileNavClose = () => setMobileNavAnchorEl(null);
  const handleUserMenuOpen = (e) => setUserMenuAnchorEl(e.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchorEl(null);
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
  const projectsToApproveCount = projectData.filter(
    (p) => p.status === "Chờ duyệt"
  ).length;
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
    {
      label: "Duyệt dự án",
      to: "/approval",
      icon: <FactCheckOutlinedIcon />,
      badgeContent: projectsToApproveCount,
    },
    {
      label: "Danh sách dự án",
      to: "/",
      icon: <HomeOutlinedIcon />,
      badgeContent: 0,
    },
    {
      label: "Tạo mới",
      to: "/createPage",
      icon: <AddIcon />,
      badgeContent: 0,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#F7FAFC", // <-- Đây là màu xám mờ (gần trắng)
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
        {/* ... (Code Toolbar của bạn giữ nguyên) ... */}
        <Toolbar>
          <Box
            component="img"
            src={Logo}
            alt="TPL Logo"
            sx={{ width: 40, height: 40, mr: 1.5, cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", flexGrow: { xs: 1, md: 0 } }}
          >
            Thiên Phát Lộc E&C
          </Typography>
          {!isMobile && <Box sx={{ flexGrow: 1 }} />}
          {isMobile && (
            <IconButton onClick={handleMobileNavOpen} sx={{ ml: "auto" }}>
              <Avatar sx={{ backgroundColor: "#1C5B41" }}>
                {userInitials}
              </Avatar>
            </IconButton>
          )}
          {!isMobile && (
            <>
              {navItems.map(({ label, to, icon, badgeContent }) => {
                let isActive = false;
                if (to === "/") {
                  isActive =
                    location.pathname === "/" ||
                    location.pathname.startsWith("/project/");
                } else if (to === "/approval") {
                  isActive =
                    location.pathname === to ||
                    location.pathname.startsWith("/approval/");
                } else {
                  isActive = location.pathname === to;
                }

                return (
                  <Button
                    key={to}
                    onClick={() => navigate(to)}
                    variant={isActive ? "contained" : "text"}
                    startIcon={
                      <Badge badgeContent={badgeContent} color="error">
                        {icon}
                      </Badge>
                    }
                    sx={{
                      mr: 1.5,
                      textTransform: "none",
                      borderRadius: "8px",
                      bgcolor: isActive ? "#1C5B41" : "transparent",
                      color: isActive ? "#fff" : "#333",
                      "&:hover": {
                        bgcolor: isActive ? "#154A32" : "#f0f0f0",
                      },
                    }}
                  >
                    {label}
                  </Button>
                );
              })}
              <Button
                onClick={handleUserMenuOpen}
                sx={{
                  textTransform: "none",
                  color: "#333",
                  borderRadius: "8px",
                  p: "4px 8px",
                  "&:hover": {
                    bgcolor: "#f0f0f0",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: "#1C5B41",
                    mr: 1,
                  }}
                >
                  {userInitials}
                </Avatar>
                <Typography
                  sx={{
                    display: { xs: "none", md: "block" },
                    fontWeight: 600,
                    mr: 0.5,
                  }}
                >
                  {userName}
                </Typography>
                <ArrowDropDownIcon />
              </Button>
            </>
          )}
        </Toolbar>
        {/* ... (Code Menus của bạn giữ nguyên) ... */}
        <Menu
          anchorEl={userMenuAnchorEl}
          open={Boolean(userMenuAnchorEl)}
          onClose={handleUserMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ mt: 1 }}
        >
          <MenuItem disabled sx={{ opacity: "1 !important" }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {userName}
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleUserMenuClose}>Hồ sơ của tôi</MenuItem>
          <MenuItem onClick={handleUserMenuClose}>Cài đặt</MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleLogout();
              handleUserMenuClose();
            }}
          >
            Đăng xuất
          </MenuItem>
        </Menu>
        <Menu
          anchorEl={mobileNavAnchorEl}
          open={Boolean(mobileNavAnchorEl)}
          onClose={handleMobileNavClose}
        >
          {navItems.map((item) => (
            <MenuItem
              key={item.to}
              onClick={() => {
                navigate(item.to);
                handleMobileNavClose();
              }}
            >
              <Box sx={{ mr: 1.5, display: "flex" }}>
                <Badge badgeContent={item.badgeContent} color="error">
                  {item.icon}
                </Badge>
              </Box>
              {item.label}
            </MenuItem>
          ))}
          <Divider />
          <MenuItem
            onClick={() => {
              handleLogout();
              handleMobileNavClose();
            }}
          >
            Đăng xuất
          </MenuItem>
        </Menu>
      </AppBar>

      {/* === NỀN XÁM MỜ ĐÂY === */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#f4f6f8", // <-- NỀN XÁM MỜ CỦA BẠN
          py: { xs: 0, md: 3 }, // Padding trên/dưới
        }}
      >
        <Outlet />
        {/* Outlet sẽ render:
            1. DashboardHome (trắng, 96%, căn giữa)
            2. HOẶC CreatePage (trắng, 100%, sát lề)
            ...tùy vào URL
        */}
      </Box>
    </Box>
  );
}

export default DashboardPage;
