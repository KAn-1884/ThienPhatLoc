import React from "react";
import { Box, Card, CardContent, Typography, Chip, Stack } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { useNavigate } from "react-router-dom";

const getStatusColor = (status) => {
  if (status === "Chờ duyệt") return "warning";
  if (status === "Nháp") return "default";
  if (status === "Đã duyệt") return "success";
  return "default";
};

function ProjectCard({
  id,
  title = "Dự án Lake City",
  formId = "#FORM-1780587453164",
  status = "Chờ duyệt",
  address = "Số 123/45, Đường Lê Thị Hồng Gấm, Khu phố 4, Phường Phú Hòa, Thành phố Thủ Dầu Một, Tỉnh Bình Dương",
  jobCount = 7,
  totalCost = "269.000.000 đ",
  date = "16/10/2025",
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/project/${id}`);
  };

  return (
    <Card
      variant="outlined"
      onClick={handleCardClick}
      sx={{
        borderRadius: "16px",
        borderColor: "rgba(45, 95, 63, 0.65)",
        borderWidth: "1.5px",
        height: "100%",
        width: "426px",
        textAlign: "left",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transform: "scale(1.02)",
        },
        // ===============================================
      }}
    >
      <CardContent
        sx={{
          padding: "24px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Cụm 1: Tiêu đề */}
        <Box>
          {/* ... (Code cũ của Cụm 1 - giữ nguyên) ... */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1.5,
            }}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ wordBreak: "break-all" }}
              >
                {formId}
              </Typography>
            </Box>
            <Chip label={status} color={getStatusColor(status)} size="small" />
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          {/* Hàng Địa điểm */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#718096", flexShrink: 0 }}
            >
              Địa điểm:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                textAlign: "right",
                color: "#2D3748",
                fontWeight: "bold",
                wordBreak: "break-word",
                maxWidth: "300px",
              }}
            >
              {address}
            </Typography>
          </Box>

          {/* Hàng Số công việc */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography variant="body2" sx={{ color: "#718096" }}>
              Số công việc:
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "#2D3748" }}
            >
              {jobCount}
            </Typography>
          </Box>

          {/* Hàng Tổng chi phí */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" sx={{ color: "#718096" }}>
              Tổng chi phí:
            </Typography>
            <Typography sx={{ fontWeight: "bold", color: "#2D5F3F" }}>
              {totalCost}
            </Typography>
          </Box>
        </Box>

        {/* Cụm 3: Ngày tháng */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          color="text.secondary"
        >
          <EventIcon sx={{ fontSize: "1.1rem" }} />
          <Typography variant="body2">{date}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
