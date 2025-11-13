// File: src/components/ProjectApproval.jsx

import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert, // Giữ lại Alert
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
// Import dữ liệu giả lập sử dụng Named Import
import { getApprovalData } from "../data/approvalMockData.js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Import icon mới
import React from "react";

// --- Các hàm định dạng số mới ---

// Định dạng số nguyên (VD: 1.421.003)
const formatNumber = (amount) => {
  if (typeof amount !== "number") return amount;
  return new Intl.NumberFormat("vi-VN").format(amount);
};

// Định dạng số thập phân (VD: 8,16)
const formatDecimal = (amount) => {
  if (typeof amount !== "number") return amount;
  return new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 1, // Bạn có thể điều chỉnh số lượng số 0
    maximumFractionDigits: 2,
  }).format(amount);
};

const tableData = [
  {
    stt: 1,
    name: "NHÀ XƯỞNG 1 (60*136m)",
    soLuong: 1,
    kl1: 8.16,
    klTong: 8.16,
    dvt: "m2",
    donGia: 1421003,
    thanhTien: 11595384268,
    ghiChu: "",
  },
  {
    stt: 2,
    name: "NHÀ XƯỞNG 2 (60*120m)",
    soLuong: 561,
    kl1: 7.2,
    klTong: 7.2,
    dvt: "m2",
    donGia: 1446068,
    thanhTien: 10411687366,
    ghiChu: "",
  },
  {
    stt: 3,
    name: "NHÀ VĂN PHÒNG + KÝ TÚC XÁ",
    soLuong: 311,
    kl1: 884,
    klTong: 884,
    dvt: "m2",
    donGia: 4500000,
    thanhTien: 3978000000,
    ghiChu: "",
  },
];

// --- Tên cột của bảng ---
const headCells = [
  { id: "stt", label: "STT" },
  { id: "name", label: "HẠNG MỤC CÔNG VIỆC", sx: { minWidth: 250 } },
  { id: "soLuong", label: "SỐ LƯỢNG", align: "right" },
  { id: "kl1", label: "KHỐI LƯỢNG 1 HẠNG MỤC", align: "right" },
  { id: "klTong", label: "KHỐI LƯỢNG TỔNG", align: "right" },
  { id: "dvt", label: "ĐƠN VỊ TÍNH" },
  { id: "donGia", label: "ĐƠN GIÁ", align: "right" },
  { id: "thanhTien", label: "THÀNH TIỀN", align: "right" },
  { id: "ghiChu", label: "GHI CHÚ" },
];

export default function ProjectApproval() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Lấy dữ liệu chi tiết (chỉ để lấy tên dự án)
  const data = getApprovalData(projectId);

  if (!data) {
    return (
      <Box sx={{ padding: 3, bgcolor: "#FFF", borderRadius: "12px" }}>
        <Alert severity="error">
          Không tìm thấy dữ liệu chi tiết cho dự án ID: {projectId}
        </Alert>
        <Button onClick={() => navigate("/approval")} sx={{ mt: 2 }}>
          Quay lại danh sách duyệt
        </Button>
      </Box>
    );
  }

  const { formData } = data; // Chỉ cần formData để lấy tên

  return (
    <Box
      sx={{
        padding: { xs: 1.5, md: 3 },
        backgroundColor: "#FFF",
        borderRadius: "12px",
        minHeight: "80vh",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)", // Thêm bóng mờ
      }}
    >
      {/* --- THANH ĐIỀU HƯỚNG VÀ TIÊU ĐỀ --- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 3,
          gap: 2,
        }}
      >
        {/* Nút Quay lại */}
        <Button
          onClick={() => navigate("/approval")} // Quay lại danh sách duyệt
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{
            borderColor: "#E0E0E0",
            color: "#333",
            textTransform: "none",
            borderRadius: "10px",
            "&:hover": { borderColor: "#333", bgcolor: "#f9f9f9" },
          }}
        >
          Quay lại
        </Button>

        {/* Tiêu đề dự án */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            flexGrow: 1,
            textTransform: "uppercase",
          }}
        >
          {formData.project}
        </Typography>

        {/* Box ẩn để giữ cho tiêu đề căn giữa hoàn hảo */}
        <Box sx={{ width: 120, visibility: "hidden" }} />
      </Box>

      {/* --- BẢNG DỮ LIỆU MỚI --- */}
      <TableContainer component={Paper} elevation={1}>
        <Table aria-label="project details table">
          <TableHead sx={{ bgcolor: "#1C5B41" }}>
            <TableRow>
              {headCells.map((cell) => (
                <TableCell
                  key={cell.id}
                  align={cell.align || "left"}
                  sx={{
                    color: "#FFF",
                    fontWeight: "bold",
                    borderBottom: "none",
                    ...cell.sx,
                  }}
                >
                  {cell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow
                key={row.stt}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.stt}</TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{row.name}</TableCell>
                <TableCell align="right">{formatNumber(row.soLuong)}</TableCell>
                <TableCell align="right">{formatDecimal(row.kl1)}</TableCell>
                <TableCell align="right">{formatDecimal(row.klTong)}</TableCell>
                <TableCell>{row.dvt}</TableCell>
                <TableCell align="right">{formatNumber(row.donGia)}</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  {formatNumber(row.thanhTien)}
                </TableCell>
                <TableCell>{row.ghiChu}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
