import React from "react";
import {
  Box,
  Paper,
  Button,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import InventoryIcon from "@mui/icons-material/Inventory";
import ConstructionIcon from "@mui/icons-material/Construction";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useNavigate } from "react-router-dom";
import Backgourd from "../assets/img/background_screen-login.jpeg";

const BACKGROUND_IMAGE = Backgourd;

const RoleButton = ({ icon, title, description, onClick }) => {
  const iconBoxSx = {
    bgcolor: "#1C5B41",
    color: "white",
    borderRadius: "8px",
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    mr: 2,
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={onClick}
      sx={{
        borderColor: "#E0E0E0",
        backgroundColor: "white",
        "&:hover": { backgroundColor: "#f9f9f9", borderColor: "#d0d0d0" },
        display: "flex",
        justifyContent: "space-between",
        p: 2,
        borderRadius: "16px",
        textTransform: "none",
        mb: 1.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={iconBoxSx}>{icon}</Box>
        <Box sx={{ textAlign: "left" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: "#2D3748" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontSize: "13px" }}
          >
            {description}
          </Typography>
        </Box>
      </Box>

      <ArrowForwardIosIcon sx={{ color: "text.secondary" }} fontSize="small" />
    </Button>
  );
};

const SectionTitle = ({ children }) => (
  <Typography
    variant="body2"
    sx={{
      fontWeight: "bold",
      color: "#1C5B41",
      mt: 2.5,
      mb: 1.5,
      textAlign: "left",
      width: "100%",
    }}
  >
    {children}
  </Typography>
);

function ChooseRolePage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRoleSelect = (role) => {
    console.log("Đã chọn vai trò:", role);
    navigate("/");
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
          width: "353px", // Giữ nguyên width
          maxWidth: "450px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          boxShadow: "0 20px 60px 0 rgba(0, 0, 0, 0.40)",
          position: "relative",
          paddingTop: "60px", // Tăng padding top cho nút back
        }}
      >
        <IconButton
          onClick={handleGoBack}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            color: "#5E5E5E",
            backgroundColor: "#f0f0f0",
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            color: "#2D5F3F",
            textAlign: "center",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          CHỌN VAI TRÒ
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#718096",
            textAlign: "center",
            fontSize: "13.2px",
            mb: 1,
          }}
        >
          Xác thực thành công! Vui lòng chọn vai trò của bạn.
        </Typography>

        {/* Danh sách vai trò */}
        <Box sx={{ width: "100%" }}>
          <SectionTitle>VAI TRÒ QUẢN LÝ</SectionTitle>
          <RoleButton
            icon={<EngineeringIcon />}
            title="Giám đốc dự án"
            description="Quản lý toàn bộ dự án và phê duyệt"
            onClick={() => handleRoleSelect("project_manager")}
          />
          <RoleButton
            icon={<VerifiedUserIcon />}
            title="Giám sát nội bộ"
            description="Giám sát và kiểm tra tiến độ"
            onClick={() => handleRoleSelect("internal_supervisor")}
          />
          <RoleButton
            icon={<AdminPanelSettingsIcon />}
            title="Admin giám đốc"
            description="Quản trị hệ thống và dữ liệu"
            onClick={() => handleRoleSelect("director_admin")}
          />

          <SectionTitle>VAI TRÒ ĐỀ XUẤT</SectionTitle>
          <RoleButton
            icon={<ConstructionIcon />}
            title="Kỹ sư ngoài hiện trường"
            description="Đề xuất và báo cáo công việc"
            onClick={() => handleRoleSelect("field_engineer")}
          />

          <SectionTitle>VAI TRÒ HỖ TRỢ</SectionTitle>
          <RoleButton
            icon={<InventoryIcon />}
            title="Phòng vật tư"
            description="Quản lý vật tư và thiết bị"
            onClick={() => handleRoleSelect("supply_room")}
          />
        </Box>
      </Paper>
    </Box>
  );
}

export default ChooseRolePage;
