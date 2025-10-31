import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputLabel,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Backgourd from "../assets/img/background_screen-login.jpeg";
import Logo from "../assets/img/logo_TPL.jpeg";

const BACKGROUND_IMAGE = Backgourd;
const LOGO = Logo;

function LoginPage() {
  const UserName = "Lehaidang@gmail.com";
  const PassWord = "Ledang912731982";
  const [inputUserName, setUserName] = useState("");
  const [inputPassWord, setPassWord] = useState("");
  const [openError, setOpenError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputUserName === UserName && inputPassWord === PassWord) {
      navigate("/");
    } else {
      setOpenError(true);
    }
  };

  const handleCloseError = () => {
    setOpenError(false);
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
        }}
      >
        <Box
          component="img"
          src={LOGO}
          alt="TPL Logo"
          sx={{ width: "150px", mb: 1 }}
        />
        <Typography
          variant="h6"
          sx={{
            color: "#2D5F3F",
            textAlign: "center",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          Thiên Phát Lộc E&C
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#718096",
            textAlign: "center",
            fontStyle: "italic",
            fontSize: "13px",
          }}
        >
          Sustainable development over time
        </Typography>

        <Box component="form" sx={{ width: "100%" }} onSubmit={handleSubmit}>
          <Box sx={{ mb: 2.5 }}>
            <InputLabel
              htmlFor="username"
              sx={{ fontWeight: 700, fontSize: "14px" }}
            >
              Tên đăng nhập
            </InputLabel>
            <TextField
              id="username"
              placeholder="Nhập tên đăng nhập"
              variant="outlined"
              fullWidth
              value={inputUserName}
              onChange={(e) => setUserName(e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <InputLabel
              htmlFor="password"
              sx={{ fontWeight: 700, fontSize: "14px" }}
            >
              Mật khẩu
            </InputLabel>
            <TextField
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              variant="outlined"
              fullWidth
              value={inputPassWord}
              onChange={(e) => setPassWord(e.target.value)}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#1C5B41",
              "&:hover": { backgroundColor: "#154A32" },
              borderRadius: "8px",
              padding: "12px 0",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Đăng nhập
          </Button>
        </Box>
      </Paper>

      <Dialog
        open={openError}
        onClose={handleCloseError}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Đăng nhập thất bại
          </Typography>
          <Typography>
            Thông tin đăng nhập không đúng, vui lòng kiểm tra lại.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button
            onClick={handleCloseError}
            variant="contained"
            sx={{
              backgroundColor: "#1C5B41",
              "&:hover": { backgroundColor: "#154A32" },
              borderRadius: "8px",
            }}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LoginPage;
