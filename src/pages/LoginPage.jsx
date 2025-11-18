// File: src/pages/LoginPage.jsx

import { useEffect } from "react";
import {
  Box,
  Paper,
  Button,
  Typography,
  // Divider,
  SvgIcon,
  CircularProgress,
} from "@mui/material";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import Backgourd from "../assets/img/background_screen-login.jpeg";
import Logo from "../assets/img/logo_TPL.jpeg";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

const BACKGROUND_IMAGE = Backgourd;
const LOGO = Logo;

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

function LoginPage() {
  const navigate = useNavigate();
  const { instance, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated && inProgress === "none") {
      console.log("LoginPage: Đăng nhập thành công. Chuyển về Dashboard.");
      navigate("/");
    }
  }, [isAuthenticated, navigate, inProgress]);

  const handleMicrosoftLogin = () => {
    if (inProgress !== "none") return;

    const loginRequest = {
      scopes: ["user.read"],
    };
    instance.loginRedirect(loginRequest).catch((e) => console.error(e));
  };

  if (inProgress !== "none" || isAuthenticated) {
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
          {inProgress !== "none"
            ? "Đang xử lý đăng nhập..."
            : "Đang chuyển hướng..."}
        </Typography>
      </Box>
    );
  }

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
        }}
      >
        <Box
          component="img"
          src={LOGO}
          alt="TPL Logo"
          sx={{ width: "120px", mb: 1, height: "60.75px" }}
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
          CHÀO MỪNG
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#718096",
            textAlign: "center",
            fontSize: "13px",
          }}
        >
          Đăng nhập hoặc đăng ký để tiếp tục
        </Typography>

        <Box sx={{ width: "100%", mt: "15px" }}>
          <Box sx={{ mb: 2.5 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleMicrosoftLogin}
              sx={{
                backgroundColor: "#fff",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
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
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginPage;
