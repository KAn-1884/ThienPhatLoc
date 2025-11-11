import { useEffect } from "react";
import {
  Box,
  Paper,
  Button,
  Typography,
  Divider,
  SvgIcon,
  CircularProgress, // Thêm
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import Backgourd from "../assets/img/background_screen-login.jpeg";
import Logo from "../assets/img/logo_TPL.jpeg";
import { mockUsers } from "../data/mockUsers";
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
  // 1. LẤY THÊM "inProgress"
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    const checkRoleAndNavigate = () => {
      // 2. THÊM ĐIỀU KIỆN: Chỉ chạy nếu MSAL không bận
      if (isAuthenticated && accounts.length > 0 && inProgress === "none") {
        const userEmail = accounts[0].username.toLowerCase();
        console.log("LoginPage: Đăng nhập thành công với:", userEmail);

        const foundUser = mockUsers.find(
          (user) => user.email.toLowerCase() === userEmail
        );

        if (foundUser && foundUser.role) {
          console.log("LoginPage: User có role. Chuyển về Dashboard.");
          navigate("/");
        } else {
          console.log(
            "LoginPage: User chưa có role. Chuyển đến trang Chọn Role."
          );
          navigate("/choose-role");
        }
      }
    };

    checkRoleAndNavigate();
    // 3. THÊM "inProgress" VÀO DEPENDENCY ARRAY
  }, [isAuthenticated, accounts, navigate, inProgress]);

  const handleMicrosoftLogin = () => {
    if (inProgress !== "none") return;

    const loginRequest = {
      scopes: ["user.read"],
    };
    instance.loginRedirect(loginRequest).catch((e) => console.error(e));
  };

  const handleGoToRegister = () => {
    navigate("/register");
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
          Đang xử lý đăng nhập...
        </Typography>
      </Box>
    );
  }

  // Nếu không bận, render trang login
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

          <Divider sx={{ width: "100%", mb: 2, mt: 1 }}>
            <Typography
              variant="body2"
              sx={{ color: "#718096", fontSize: "11.8px" }}
            >
              hoặc
            </Typography>
          </Divider>

          <Button
            variant="contained"
            fullWidth
            onClick={handleGoToRegister}
            sx={{
              backgroundColor: "#1C5B41",
              "&:hover": { backgroundColor: "#154A32" },
              borderRadius: "10px",
              padding: "12px 0",
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "0 4px 15px 0 rgba(45, 95, 63, 0.30)",
            }}
          >
            <PersonAddIcon sx={{ mr: "7.68px" }}></PersonAddIcon>
            Đăng ký tài khoản mới
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginPage;
