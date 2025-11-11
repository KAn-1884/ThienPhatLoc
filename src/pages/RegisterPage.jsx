import React from "react";
import {
  Box,
  Paper,
  Button,
  Typography,
  SvgIcon,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Backgourd from "../assets/img/background_screen-login.jpeg";
import Logo from "../assets/img/logo_TPL.jpeg";

const BACKGROUND_IMAGE = Backgourd;
const LOGO = Logo;

// Component Icon Microsoft
function MicrosoftLogoIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 21 21">
      <path fill="#f25022" d="M1 1h9v9H1z" />
      <path fill="#00a4ef" d="M1 11h9v9H1z" />
      <path fill="#7fba00" d="M11 1h9v9h-9z" />
      <path fill="#ffb900" d="M11 11h9v9h-9z" />
    </SvgIcon>
  );
}

function RegisterPage() {
  const navigate = useNavigate();

  const handleMicrosoftLogin = () => {
    console.log("Đang chuyển hướng đến trang đăng nhập Microsoft...");
    navigate("/choose-role");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundImage: `url(${BACKGROUND_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: "16px 20px",
          borderRadius: "20px",
          width: "353px",
          maxWidth: "450px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          boxShadow: "0 20px 60px 0 rgba(0, 0, 0, 0.40)",
          position: "relative",
          paddingTop: "50px",
        }}
      >
        <IconButton
          onClick={handleGoBack}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            color: "#666",
            backgroundColor: "#f0f0f0",
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box
          component="img"
          src={LOGO}
          alt="TPL Logo"
          sx={{ width: "120px", height: "60.75px", mb: 1 }}
        />
        <Typography
          variant="h6"
          sx={{
            color: "#2D5F3F",
            textAlign: "center",
            fontSize: "28px",
            fontWeight: 700,
            mb: "-7px",
          }}
        >
          ĐĂNG KÝ TÀI KHOẢN
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#718096",
            textAlign: "center",
            fontSize: "13px",
          }}
        >
          Đăng nhập bằng tài khoản Microsoft do công ty cấp
        </Typography>

        <Box sx={{ width: "100%", mt: "15px" }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleMicrosoftLogin}
            sx={{
              backgroundColor: "#fff",
              "&:hover": {
                backgroundColor: "#f5f5ff",
                borderColor: "#8C8C8C",
              },
              borderRadius: "4px",
              padding: "12px 0",
              fontWeight: "bold",
              textTransform: "none",
              color: "#5E5E5E",
              border: "1px solid #8C8C8C",
              boxShadow: "none",
            }}
          >
            <MicrosoftLogoIcon sx={{ mr: "7.68px" }} />
            Đăng nhập với Microsoft
          </Button>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: "#718096",
            textAlign: "center",
            fontSize: "12.3px",
            mt: 2,
          }}
        >
          Sau khi xác thực, bạn sẽ chọn vai trò của mình
        </Typography>
      </Paper>
    </Box>
  );
}

export default RegisterPage;
