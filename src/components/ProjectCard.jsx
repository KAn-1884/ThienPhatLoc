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

// === getStatusStyles (Không thay đổi) ===
const getStatusStyles = (status) => {
  // ... (giữ nguyên hàm này)
  switch (status) {
    case "Đã duyệt":
      return {
        backgroundColor: "#D1FAE5",
        color: "#065F46",
        borderRadius: "20px",
      };
    case "Chờ duyệt":
      return {
        backgroundColor: "#FEF3C7",
        color: "#92400E",
        borderRadius: "20px",
      };
    case "Từ chối":
      return {
        backgroundColor: "#FFF5F5",
        color: "#C73434",
        borderRadius: "20px",
      };
    case "Nháp":
    default:
      return {
        backgroundColor: "#F4F6F8",
        color: "#637381",
        borderRadius: "20px",
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
        {/* === CỤM 1: TIÊU ĐỀ === */}
        <Box sx={{ mb: 2 }}>
          {/* ... (Nội dung cụm 1 giữ nguyên) ... */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "flex-start" },
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
            <Chip
              label={status}
              size="small"
              sx={{
                height: "24px",
                fontSize: "0.75rem",
                fontWeight: "bold",
                borderRadius: "6px",
                padding: "0 2px",
                ...getStatusStyles(status),
                mt: { xs: 1, sm: 0 },
              }}
            />
          </Box>
        </Box>

        {/* === CỤM 2: NỘI DUNG CHÍNH === */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Hàng Địa điểm */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "flex-start",
              // mb: 1, // Bỏ mb ở đây để Divider kiểm soát khoảng cách
              gap: { xs: 0, sm: 2 },
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
                textAlign: { xs: "left", sm: "right" },
                color: "#2D3748",
                fontWeight: "bold",
                wordBreak: "break-word",
                maxWidth: { xs: "100%", sm: "300px" },
              }}
            >
              {address}
            </Typography>
          </Box>

          {/* === THÊM DIVIDER 1 === */}
          <Divider sx={{ my: 1, borderColor: "rgba(0,0,0,0.05)" }} />

          {/* Hàng Số công việc */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // mb: 1, // Bỏ mb ở đây
            }}
          >
            <Typography variant="body2" sx={{ color: "#718096" }}>
              Số công việc:
            </Typography>
            <Typography variant="body2" sx={{ color: "#2D3748" }}>
              {jobCount}
            </Typography>
          </Box>

          <Divider sx={{ my: 1, borderColor: "rgba(0,0,0,0.05)" }} />

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
        {/* === KẾT THÚC CỤM 2 === */}

        <Divider sx={{ my: 1, borderColor: "rgba(0,0,0,0.05)" }} />

        {/* === CỤM 3: LÝ DO TỪ CHỐI (Điều kiện) === */}
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

        {/* === CỤM 4: FOOTER === */}
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
