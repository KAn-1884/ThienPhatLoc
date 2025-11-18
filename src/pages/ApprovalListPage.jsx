import React, { useState } from "react"; // === 1. THÊM useState ===
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Snackbar, // === 2. THÊM Snackbar ===
  Alert, // === 3. THÊM Alert ===
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { projectsToApprove } from "../data/approvalMockData.js";

// === 4. SỬA ĐỔI: ApprovalCard nhận thêm props onApprove, onReject ===
const ApprovalCard = ({ project, navigate, onApprove, onReject }) => {
  const handleApproveQuick = () => {
    // Bỏ alert, gọi hàm từ props
    // alert(`Dự án "${project.name}" (ID: ${project.id}) ĐÃ ĐƯỢC DUYỆT NHANH!`);
    onApprove(project);
  };

  const handleRejectQuick = () => {
    // Bỏ alert, gọi hàm từ props
    // alert(`Dự án "${project.name}" (ID: ${project.id}) ĐÃ BỊ TỪ CHỐI NHANH!`);
    onReject(project);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: { xs: 2, md: 3 },
        mb: 3,
        borderRadius: "8px",
        border: "1px solid #EEEEEE",
      }}
    >
      {/* TIÊU ĐỀ VÀ ID */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#2D3748" }}>
          {project.name}
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        #{project.id}
      </Typography>

      {/* CHIP TRẠNG THÁI */}
      <Chip
        label={project.status}
        size="small"
        sx={{
          bgcolor: "#FEF3C7",
          color: "#92400E",
          fontWeight: "bold",
          mb: 2,
        }}
      />

      {/* KHU VỰC THÔNG TIN (Responsive) */}
      <Box
        sx={{
          bgcolor: "#F7FAFC",
          borderRadius: "4px",
          p: { xs: 1.5, md: 2 },
          mb: 3,
          border: "1px solid #eee",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          {/* Block 1: Địa điểm */}
          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: "50%", lg: "25%" },
              pr: 2,
              boxSizing: "border-box",
              mb: { xs: 1.5, md: 0 },
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Địa điểm
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              <strong>{project.address}</strong>
            </Typography>
          </Box>

          {/* Block 2: Số hạng mục */}
          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: "50%", lg: "25%" },
              pr: 2,
              boxSizing: "border-box",
              mb: { xs: 1.5, md: 0 },
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Số hạng mục
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              <strong>{project.totalItems} hạng mục</strong>
            </Typography>
          </Box>

          {/* Block 3: Tổng chi phí */}
          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: "50%", lg: "25%" },
              pr: 2,
              boxSizing: "border-box",
              mb: { xs: 1.5, md: 0 },
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Tổng chi phí
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              <strong>{project.formattedCost} đ</strong>
            </Typography>
          </Box>

          {/* Block 4: Ngày tạo */}
          <Box
            sx={{
              width: { xs: "100%", sm: "100%", md: "50%", lg: "25%" },
              pr: 2,
              boxSizing: "border-box",
              mb: { xs: 1.5, md: 0 },
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Ngày tạo
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              <strong>{project.createdDate}</strong>
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Nút hành động */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 1.5,
          alignItems: { xs: "stretch", md: "center" },
        }}
      >
        {/* Box chứa 2 nút Duyệt và Từ chối */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            flexDirection: { xs: "column", md: "row" },
            width: { xs: "100%", md: "85%" },
            "& > button": { flex: { xs: "none", md: 1 } },
          }}
        >
          <Button
            variant="contained"
            startIcon={<CheckCircleOutlineIcon />}
            onClick={handleApproveQuick}
            sx={{
              backgroundColor: "#1C5B41",
              color: "#FFF",
              textTransform: "none",
              fontWeight: "bold",
              flex: { xs: "none", md: 1 },
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#154A32" },
              width: { xs: "100%", md: "auto" },
            }}
          >
            Duyệt dự án
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<CancelOutlinedIcon />}
            onClick={handleRejectQuick}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              flex: { xs: "none", md: 1 },
              border: "2px solid #E53E3E",
              borderRadius: "8px",
              width: { xs: "100%", md: "auto" },
            }}
          >
            Từ chối
          </Button>
        </Box>

        {/* Box chứa nút Xem chi tiết */}
        <Box
          sx={{
            width: { xs: "100%", md: "auto" },
            ml: { xs: 0, md: 1.5 },
            flex: { xs: "none", md: 1 },
          }}
        >
          <Button
            variant="text"
            startIcon={<VisibilityOutlinedIcon />}
            onClick={() => navigate(`/approval/${project.id}`)}
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              color: "#2D5F3F",
              justifyContent: "center",
              backgroundColor: "#E2E8F0",
              width: "100%",
              borderRadius: "8px",
              "&:hover": { bgcolor: "#e4e4e4ff" },
            }}
          >
            Xem chi tiết
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default function ApprovalListPage() {
  const navigate = useNavigate();

  // === 5. THÊM STATE CHO SNACKBAR ===
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" (xanh) hoặc "error" (đỏ)
  });

  // === 6. THÊM HÀM XỬ LÝ CHO SNACKBAR ===
  const handleApprove = (project) => {
    console.log("Duyệt dự án:", project.name);
    setSnackbar({
      open: true,
      message: `Đã duyệt nhanh dự án "${project.name}"!`,
      severity: "success",
    });
  };

  const handleReject = (project) => {
    console.log("Từ chối dự án:", project.name);
    setSnackbar({
      open: true,
      message: `Đã từ chối dự án "${project.name}".`,
      severity: "error",
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };
  // =======================================

  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        borderRadius: "12px",
        padding: { xs: 1.5, md: 3 },
        width: { xs: "100%", md: "96%" },
        margin: "0 auto",
        boxSizing: "border-box",
        minHeight: "80vh",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          mb: 4,
          color: "#000000ff",
          textAlign: "center",
        }}
      >
        Duyệt dự án
      </Typography>

      {projectsToApprove.length === 0 ? (
        <Paper
          elevation={1}
          sx={{ p: 4, textAlign: "center", borderRadius: "12px" }}
        >
          <Typography variant="h6" color="text.secondary">
            🎉 Không có dự án nào đang chờ duyệt.
          </Typography>
        </Paper>
      ) : (
        <Box>
          {projectsToApprove.map((project) => (
            <ApprovalCard
              key={project.id}
              project={project}
              navigate={navigate}
              // === 7. TRUYỀN HÀM XUỐNG CON ===
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </Box>
      )}

      {/* === 8. THÊM COMPONENT SNACKBAR VÀO CUỐI === */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000} // Tự động tắt sau 4 giây
        onClose={handleCloseSnackbar}
        // anchorOrigin để chỉnh vị trí "từ trên đầu xuống"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
