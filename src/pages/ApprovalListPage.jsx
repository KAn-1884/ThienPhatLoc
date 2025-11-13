// File: src/pages/ApprovalListPage.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper, Chip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { projectsToApprove } from "../data/approvalMockData.js";

const ApprovalCard = ({ project, navigate }) => {
  const handleApproveQuick = () => {
    alert(`Dự án "${project.name}" (ID: ${project.id}) ĐÃ ĐƯỢC DUYỆT NHANH!`);
  };

  const handleRejectQuick = () => {
    alert(`Dự án "${project.name}" (ID: ${project.id}) ĐÃ BỊ TỪ CHỐI NHANH!`);
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

      {/* Nút hành động (ĐÃ CẬP NHẬT THEO ẢNH MỚI) */}
      <Box
        sx={{
          display: "flex",
          // Luôn xếp chồng các nút lên nhau trên mobile (xs)
          flexDirection: { xs: "column", md: "row" },
          gap: 1.5, // Giữ khoảng cách giữa các nút
          alignItems: { xs: "stretch", md: "center" }, // Kéo dãn các nút con trên mobile
        }}
      >
        {/* Box chứa 2 nút Duyệt và Từ chối */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            // Trên mobile, 2 nút này cũng xếp chồng lên nhau
            flexDirection: { xs: "column", md: "row" },
            // Chiếm 100% chiều rộng trên mobile, giữ 85% trên desktop
            width: { xs: "100%", md: "85%" },
            // Trên mobile, các nút con tự kéo dãn để chiếm toàn bộ Box cha
            "& > button": { flex: { xs: "none", md: 1 } }, // Button con không dùng flex:1 trên mobile nữa
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
              // Flex:1 trên desktop, nhưng không còn trên mobile để nó tự co dãn 100%
              flex: { xs: "none", md: 1 },
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#154A32" },
              width: { xs: "100%", md: "auto" }, // Đảm bảo chiếm 100% trên mobile
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
              // Flex:1 trên desktop, nhưng không còn trên mobile
              flex: { xs: "none", md: 1 },
              border: "2px solid #E53E3E",
              borderRadius: "8px",
              width: { xs: "100%", md: "auto" }, // Đảm bảo chiếm 100% trên mobile
            }}
          >
            Từ chối
          </Button>
        </Box>

        {/* Box chứa nút Xem chi tiết */}
        <Box
          sx={{
            // Trên mobile, box này chiếm 100%
            width: { xs: "100%", md: "auto" },
            // Bỏ ml trên mobile
            ml: { xs: 0, md: 1.5 },
            // Trên desktop, nó sẽ co lại theo nội dung
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
              width: "100%", // Luôn chiếm 100% của Box cha
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

  return (
    <Box
      sx={{
        padding: { xs: 0, md: 0 },
        minHeight: "80vh",
        backgroundColor: "#fff",
        borderRadius: "10px",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: "bold",
          mb: 4,
          color: "#1C5B41",
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
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
