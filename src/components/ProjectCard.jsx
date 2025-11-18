import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { useNavigate } from "react-router-dom";

// === getStatusStyles ===
const getStatusStyles = (status) => {
  switch (status) {
    case "Đã duyệt":
      return {
        backgroundColor: "#D1FAE5",
        color: "#065F46",
      };
    case "Chờ duyệt":
      return {
        backgroundColor: "#FEF3C7",
        color: "#92400E",
      };
    case "Từ chối":
      return {
        backgroundColor: "#FFF5F5",
        color: "#C73434",
      };
    case "Nháp":
    default:
      return {
        backgroundColor: "#F4F6F8",
        color: "#637381",
      };
  }
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
  rejectionReason = null,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/project/${id}`);
  };

  // ĐÃ XÓA minWidth: "90px" -> Rất Tốt
  const labelStyles = {
    color: "#718096",
    flexShrink: 0,
    textAlign: "left",
    lineHeight: 1.5,
  };

  const rowBoxStyles = {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  };

  return (
    <Card
      variant="outlined"
      onClick={handleCardClick}
      sx={{
        borderRadius: "16px",
        borderColor: "rgba(45, 95, 63, 0.65)",
        borderWidth: "1.5px",
        height: "100%", // Giúp card cao bằng nhau
        width: "100%", // Lấp đầy cột 33%
        textAlign: "left",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transform: "scale(1.02)",
        },
      }}
    >
      <CardContent
        sx={{
          padding: { xs: "16px", md: "24px" },
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* === CỤM 1: TIÊU ĐỀ (Đã sửa) === */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1.5,
            }}
          >
            {/* 1. Box bọc Tiêu đề phải có minWidth: 0 */}
            <Box sx={{ minWidth: 0, mr: 1.5 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  // 2. Ép Tiêu đề xuống hàng
                  wordBreak: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ wordBreak: "break-all" }} // ID cũng phải xuống hàng
              >
                {formId}
              </Typography>
            </Box>

            {/* Chip (không đổi) */}
            <Chip
              label={status}
              size="small"
              sx={{
                height: "24px",
                fontSize: "0.75rem",
                fontWeight: "bold",
                borderRadius: "6px",
                padding: "0 2px",
                flexShrink: 0, // Không cho chip co lại
                ...getStatusStyles(status),
              }}
            />
          </Box>
        </Box>

        {/* === CỤM 2: NỘI DUNG CHÍNH (Đã đúng) === */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Hàng Địa điểm (Đã đúng) */}
          <Box
            sx={{
              ...rowBoxStyles,
              alignItems: "flex-start",
            }}
          >
            <Typography variant="body2" sx={labelStyles}>
              Địa điểm:
            </Typography>
            {/* Box này (flex: 1, minWidth: 0) sẽ co lại
                và ép Typography bên trong xuống hàng */}
            <Box sx={{ flex: 1, minWidth: 0, textAlign: "right" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#2D3748",
                  fontWeight: "bold",
                  lineHeight: 1.5,
                  wordBreak: "break-all", // Ép địa chỉ xuống hàng
                  whiteSpace: "normal",
                }}
              >
                {address}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 1, borderColor: "rgba(0,0,0,0.05)" }} />

          {/* Hàng Số công việc (Đã đúng) */}
          <Box
            sx={{
              ...rowBoxStyles,
              alignItems: "center",
            }}
          >
            <Typography variant="body2" sx={labelStyles}>
              Số công việc:
            </Typography>
            <Box sx={{ flex: 1, minWidth: 0, textAlign: "right" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#2D3748",
                  lineHeight: 1.5,
                }}
              >
                {jobCount}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 1, borderColor: "rgba(0,0,0,0.05)" }} />

          {/* Hàng Tổng chi phí (Đã đúng) */}
          <Box
            sx={{
              ...rowBoxStyles,
              alignItems: "center",
            }}
          >
            <Typography variant="body2" sx={labelStyles}>
              Tổng chi phí:
            </Typography>
            <Box sx={{ flex: 1, minWidth: 0, textAlign: "right" }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#2D5F3F",
                  lineHeight: 1.5,
                  wordBreak: "break-all", // Ép cả số tiền xuống hàng
                  whiteSpace: "normal",
                }}
              >
                {totalCost}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 1, borderColor: "rgba(0,0,0,0.05)" }} />

        {/* === CỤM 3: LÝ DO TỪ CHỐI (Giữ nguyên) === */}
        {status === "Từ chối" && rejectionReason && (
          <>
            <Box
              sx={{
                backgroundColor: "#FFF5F5",
                color: "#C73434",
                borderRadius: "8px",
                p: "12px 16px",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold", mb: 0.5 }}>
                Lý do từ chối:
              </Typography>
              <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                {rejectionReason}
              </Typography>
            </Box>
            <Divider sx={{ my: 1.5, borderColor: "rgba(0,0,0,0.05)" }} />
          </>
        )}

        {/* === CỤM 4: FOOTER (Giữ nguyên) === */}
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            color="text.secondary"
          >
            <EventIcon sx={{ fontSize: "1.1rem" }} />
            <Typography variant="body2">{date}</Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
