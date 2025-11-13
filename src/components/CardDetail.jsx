import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  // ĐÃ XÓA: AppBar, Toolbar, IconButton, Avatar, Badge
} from "@mui/material";
// ĐÃ XÓA: AddIcon, ListAltIcon, NotificationsNoneIcon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// ĐÃ XÓA: Logo
import { projectData } from "../data/projectData";
// Import hàm và data mới từ file data
import { getFormattedWorkItems } from "../data/workItem";

export default function CardDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = projectData.find((p) => p.id.toString() === projectId);

  const formattedWorkItems = getFormattedWorkItems(projectId);

  // ĐÃ XÓA: hàm handleLogout()

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
    // ĐÃ XÓA: <Box> wrapper và <AppBar>
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            bgcolor: "#FFF",
            color: "#4A5568",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            "&:hover": {
              bgcolor: "#f8f8f8",
            },
            mb: 3,
          }}
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)} // Quay lại trang trước (Dashboard hoặc Approval)
        >
          Quay lại
        </Button>

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#1C5B41",
            textAlign: "center",
            mb: 1,
            textTransform: "uppercase",
          }}
        >
          {project.title} {/* Lấy title từ projectData */}
        </Typography>
        <Divider
          sx={{
            borderColor: "#1C5B41",
            borderWidth: "3px",
            mb: 4,
          }}
        />

        {/* === Table section === */}
        <TableContainer
          component={Paper}
          variant="outlined"
          sx={{ overflowX: "auto", maxWidth: "100%", borderRadius: "8px" }}
        >
          <Table sx={{ minWidth: 1000 }} size="small">
            <TableHead sx={{ backgroundColor: "#1C5B41" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  STT
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  HẠNG MỤC CÔNG VIỆC
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="right"
                >
                  SỐ LƯỢNG
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="right"
                >
                  KHỐI LƯỢNG 1 HẠNG MỤC
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="right"
                >
                  KHỐI LƯỢNG TỔNG
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  ĐƠN VỊ TÍNH
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="right"
                >
                  ĐƠN GIÁ
                </TableCell>
                <TableCell
                  sx={{ color: "white", fontWeight: "bold" }}
                  align="right"
                >
                  THÀNH TIỀN
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  GHI CHÚ
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {formattedWorkItems.map((item, index) => (
                <TableRow
                  key={item.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:nth-of-type(odd)": {
                      backgroundColor: "#fcfcfcff", // Hàng lẻ màu trắng
                    },
                    "&:nth-of-type(even)": {
                      backgroundColor: "#F7FAFC", // Hàng chẵn màu xám nhạt
                    },
                    "&:hover": {
                      backgroundColor: "#f0f0f0", // Màu khi hover
                    },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{item.hangMuc}</TableCell>
                  <TableCell align="right">{item.soLuong}</TableCell>
                  <TableCell align="right">{item.khoiLuong1HM}</TableCell>
                  <TableCell align="right">{item.khoiLuongTong}</TableCell>
                  <TableCell>{item.donViTinh}</TableCell>
                  <TableCell align="right">{item.donGia}</TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", color: "#1C5B41" }}
                  >
                    {item.thanhTien}
                  </TableCell>
                  <TableCell>{item.ghiChu}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
