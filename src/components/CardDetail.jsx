import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Logo from "../assets/img/logo_TPL.jpeg";
import { projectData } from "../data/projectData";
import { workItems } from "../data/workItem";

const totalCost = "269.000.000 đ";
const costInWords = "Hai trăm sáu mươi chín triệu đồng";

const getStatusColor = (status) => {
  if (status === "Chờ duyệt") return "warning";
  if (status === "Nháp") return "default";
  if (status === "Đã duyệt") return "success";
  return "default";
};

export default function CardDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = projectData.find((p) => p.id.toString() === projectId);

  const handleLogout = () => {
    navigate("/");
  };

  const projectInfo = project
    ? [
        { label: "Dự án", value: project.title },
        { label: "Địa điểm", value: project.address },
        { label: "Thời gian", value: project.date },
        { label: "Đợt", value: project.batch },
      ]
    : [];

  if (!project) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" color="error" gutterBottom>
          Lỗi: Không tìm thấy dự án
        </Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/")}>
          Quay về trang chủ
        </Button>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        maxWidth: "100vw",
      }}
    >
      <AppBar
        position="static"
        elevation={1}
        sx={{
          backgroundColor: "#FFF",
          color: "#333",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Box
            component="img"
            src={Logo}
            alt="TPL Logo"
            sx={{ width: 40, height: 40, mr: 1.5 }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              flexGrow: { xs: 1, md: 0 },
              fontSize: { xs: "1rem", sm: "1.2rem" },
            }}
          >
            Thiên Phát Lộc E&C
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "#fff",
                color: "#1C5B41",
                mr: 2,
                textTransform: "none",
                borderRadius: "8px",
              }}
            >
              Tạo mới
            </Button>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: "#1C5B41",
                "&:hover": { backgroundColor: "#154A32" },
                mr: 2,
                textTransform: "none",
                borderRadius: "8px",
                borderColor: "#1C5B41",
                color: "#fff",
              }}
            >
              Danh sách
            </Button>
          </Box>

          <IconButton onClick={handleLogout}>
            <Avatar sx={{ backgroundColor: "#1C5B41" }}>Out</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ==== MAIN CONTENT ==== */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 5 },
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                borderColor: "#4A5568",
                color: "#4A5568",
                "&:hover": {
                  borderColor: "#2D3748",
                  color: "#2D3748",
                },
              }}
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Quay lại
            </Button>
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                borderColor: "#4A5568",
                color: "#4A5568",
                "&:hover": {
                  borderColor: "#2D3748",
                  color: "#2D3748",
                },
              }}
              startIcon={<DeleteOutlineIcon />}
            >
              Xóa
            </Button>
          </Box>
          <Divider sx={{ mb: 4 }} />

          {/* === Title section === */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "center", sm: "flex-start" },
              mb: 4,
              textAlign: { xs: "center", sm: "left" },
              gap: 2,
            }}
          >
            <Box
              component="img"
              src={Logo}
              sx={{
                width: { xs: 100, sm: 150 },
                borderRadius: "10px",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                display: "flex",
                color: "#2D5F3F",
                flexGrow: 1,
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              BẢNG TỔNG HỢP CHI PHÍ THI CÔNG
            </Typography>
            <Chip
              label={project.status}
              color={getStatusColor(project.status)}
            />
          </Box>
          <Divider
            sx={{
              backgroundColor: "#2D5F3F",
              height: "2px",
              borderRadius: "12px",
              mb: 4,
            }}
          />

          {/* === General info === */}
          <Box
            sx={{
              mb: 4,
              backgroundColor: "#EDF2F7",
              borderRadius: "12px",
              p: { xs: 2, sm: 3 },
            }}
          >
            {projectInfo.map((item) => (
              <Box
                key={item.label}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  mb: 2,
                  "&:last-child": { mb: 0 },
                }}
              >
                <Typography
                  color="text.secondary"
                  sx={{
                    fontWeight: 500,
                    width: { xs: "80px", sm: "100px" },
                    flexShrink: 0,
                  }}
                >
                  {item.label}:
                </Typography>

                <Typography
                  sx={{
                    ml: 2,
                    wordBreak: "break-word",
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* === Table section === */}
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ overflowX: "auto", maxWidth: "100%" }}
          >
            <Table sx={{ minWidth: 400 }} size="small">
              <TableHead sx={{ backgroundColor: "#2D5F3F" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>
                    STT
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#FFF" }}>
                    CÔNG VIỆC THỰC HIỆN
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", color: "#FFF" }}
                    align="left"
                  >
                    SỐ TIỀN
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "#FFF",
                      display: { xs: "none", sm: "table-cell" },
                    }}
                  >
                    GHI CHÚ
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workItems.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                      "&:nth-of-type(even)": { backgroundColor: "#EDF2F7" },
                      "&:hover": { backgroundColor: "#e8f5e9" },
                    }}
                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 500 }}>
                      {item.cost}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "text.secondary",
                        fontSize: "1rem",
                        display: { xs: "none", sm: "table-cell" },
                      }}
                    >
                      {item.note}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* === Total section === */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              borderTop: "4px solid #2D5F3F",
              backgroundColor: "#EDF2F7",
              borderRadius: "0 0 20px 20px",
            }}
          >
            {/* Cột trống bên trái để cân giữa */}
            <Box sx={{ flex: 1 }} />

            {/* Chữ “TỔNG CỘNG” nằm chính giữa */}
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                TỔNG CỘNG
              </Typography>
            </Box>

            {/* Cột bên phải: số tiền + chấm + chữ */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 1,
                flexWrap: "nowrap",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  color: "#2D5F3F",
                  whiteSpace: "nowrap",
                }}
              >
                {totalCost}
              </Typography>

              <Box
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  backgroundColor: "text.secondary",
                  opacity: 0.7,
                }}
              ></Box>

              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontStyle: "italic",
                  whiteSpace: "nowrap",
                }}
              >
                {costInWords}
              </Typography>
            </Box>
          </Box>

          {/* === Signature section === */}
          <Box
            sx={{ mt: 8, backgroundColor: "#EDF2F7", borderRadius: 2, p: 2 }}
          >
            <Typography
              sx={{
                mb: 4,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              Ngày {new Date().getDate()} tháng {new Date().getMonth() + 1} năm{" "}
              {new Date().getFullYear()}
            </Typography>

            <Grid
              container
              spacing={2}
              sx={{
                textAlign: "center",
                justifyContent: "space-evenly",
              }}
            >
              {[
                "NGƯỜI LẬP",
                "CHỈ HUY TRƯỞNG",
                "PHÒNG TC-KT",
                "BAN GIÁM ĐỐC",
              ].map((title) => (
                <Grid item xs={12} sm={6} md={3} key={title}>
                  <Typography sx={{ fontWeight: "bold", mb: 4 }}>
                    {title}
                  </Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    (Ký, ghi rõ họ tên)
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
