import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { numberToVietnameseWords } from "../changeNum2Word/num2wod.jsx";

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
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const formatCurrency = (v) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    Number(v) || 0
  );

const convertTotalToWords = (total) => `(${numberToVietnameseWords(total)})`;

const getApprovalDate = () => {
  const d = new Date();
  return `Ngày ${d.getDate()} tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`;
};

const formatDate = (dateString) =>
  !dateString
    ? ""
    : new Date(dateString).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

const disabledTextFieldStyle = {
  "& .MuiInput-underline:before": {
    borderBottom: "1.5px solid rgba(0, 0, 0, 0.15)",
  },
  "& .MuiInput-underline.Mui-disabled:before": {
    borderBottom: "1.5px solid rgba(0, 0, 0, 0.15)",
  },
};

const ApprovalSelect = ({ label, value, onChange }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Typography fontWeight="bold" variant="body2" gutterBottom>
      {label}
    </Typography>
    <FormControl variant="standard" fullWidth size="small">
      <Select value={value} onChange={onChange}>
        <MenuItem value="pending">--Chưa--</MenuItem>
        <MenuItem value="approved">Duyệt</MenuItem>
        <MenuItem value="rejected">Từ chối</MenuItem>
      </Select>
    </FormControl>
  </Grid>
);

export default function ApprovalCard() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [approvalState, setApprovalState] = useState({
    truongPhong: "pending",
    tc_kt: "pending",
    banGiamDoc: "pending",
  });

  // === BƯỚC 1: THÊM STATE MỚI CHO POP-UP ===
  const [openConfirm, setOpenConfirm] = useState(false);

  const { formData, workItems, totalCost } = state;
  const TABLE_HEADERS = ["STT", "CÔNG VIỆC", "SỐ TIỀN", "GHI CHÚ"];

  const handleChange = (field) => (e) =>
    setApprovalState((prev) => ({ ...prev, [field]: e.target.value }));

  // === BƯỚC 2: THÊM CÁC HÀM XỬ LÝ POP-UP ===
  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleConfirmSubmit = () => {
    // --- TẠI ĐÂY: Thêm logic "Gửi duyệt" của bạn ---
    console.log("Đã xác nhận gửi duyệt:", approvalState);

    // 1. Đóng pop-up
    handleCloseConfirm();

    // 2. (Tùy chọn) Chuyển về trang chủ sau khi gửi
    // navigate("/");
  };

  const approvals = [
    { label: "CHỈ HUY TRƯỞNG CT", field: "truongPhong" },
    { label: "PHÒNG TC-KT", field: "tc_kt" },
    { label: "BAN GIÁM ĐỐC", field: "banGiamDoc" },
  ];

  const renderField = (label, value) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Typography
        sx={{
          width: 100,
          fontWeight: 600,
          color: "text.secondary",
          textAlign: "left",
        }}
      >
        {label}:
      </Typography>
      <TextField
        variant="standard"
        value={value}
        fullWidth
        disabled
        sx={{ ml: 2, ...disabledTextFieldStyle }}
      />
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="#2D5F3F"
            textAlign="center"
            mb={2}
          >
            BẢNG TỔNG HỢP CHI PHÍ THI CÔNG
          </Typography>
          <Divider
            sx={{
              backgroundColor: "#2D5F3F",
              height: "2px",
              borderRadius: "1px",
              mb: 4,
            }}
          />

          <Box
            sx={{ p: 3, borderRadius: 2, backgroundColor: "#f9fafb", mb: 4 }}
          >
            {renderField("Dự án", formData.project)}
            {renderField("Địa điểm", formData.address)}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography
                sx={{
                  width: 100,
                  fontWeight: 600,
                  color: "text.secondary",
                  textAlign: "left",
                }}
              >
                Thời gian:
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flex: 1,
                  ml: 2,
                }}
              >
                <TextField
                  type="text"
                  variant="standard"
                  value={formatDate(formData.dateFrom)}
                  sx={{ width: 140, ...disabledTextFieldStyle }}
                  disabled
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayIcon sx={{ fontSize: "1.2rem" }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography sx={{ color: "text.secondary" }}> - </Typography>
                <TextField
                  type="text"
                  variant="standard"
                  value={formatDate(formData.dateTo)}
                  sx={{ width: 140, ...disabledTextFieldStyle }}
                  disabled
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarTodayIcon sx={{ fontSize: "1.2rem" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
            {renderField("Đợt", formData.batch)}
          </Box>

          <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
            <Table size="small">
              <TableHead sx={{ backgroundColor: "#2D5F3F" }}>
                <TableRow>
                  {TABLE_HEADERS.map((h) => (
                    <TableCell
                      key={h}
                      sx={{ color: "#fff", fontWeight: "bold" }}
                      align={h === "SỐ TIỀN" ? "right" : "left"}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {workItems.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">
                      {formatCurrency(item.cost)}
                    </TableCell>
                    <TableCell>{item.note}</TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                  <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                    TỔNG CỘNG
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>
                    {formatCurrency(totalCost)}
                  </TableCell>
                  <TableCell sx={{ fontStyle: "italic" }}>
                    {convertTotalToWords(totalCost)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{ p: 3, borderRadius: 2, backgroundColor: "#f9fafb", mb: 4 }}
          >
            <Typography textAlign="center" mb={3} fontStyle="italic">
              {getApprovalDate()}
            </Typography>
            <Grid
              container
              spacing={2}
              textAlign="center"
              justifyContent="space-between"
            >
              <Grid item xs={12} sm={6} md={3}>
                <Typography fontWeight="bold" variant="body2" gutterBottom>
                  NGƯỜI LẬP
                </Typography>
                <Typography>{formData.creator || "Lê Văn Bằng"}</Typography>
              </Grid>
              {approvals.map(({ label, field }) => (
                <ApprovalSelect
                  key={field}
                  label={label}
                  value={approvalState[field]}
                  onChange={handleChange(field)}
                />
              ))}
            </Grid>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                borderColor: "#4A5568",
                color: "#4A5568",
                "&:hover": { borderColor: "#2D3748", color: "#2D3748" },
              }}
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
            >
              Quay lại
            </Button>

            <Button
              variant="contained"
              sx={{ backgroundColor: "#1C5B41" }}
              startIcon={<SaveIcon />}
              onClick={handleOpenConfirm}
            >
              Gửi duyệt
            </Button>
          </Box>

          <Dialog
            open={openConfirm}
            onClose={handleCloseConfirm}
            maxWidth="xs"
            fullWidth
          >
            <DialogContent sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Xác nhận gửi duyệt
              </Typography>
              <Typography>
                Bạn có chắc chắn muốn gửi biểu mẫu này để duyệt không?
              </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center", pb: 3, gap: 1 }}>
              <Button
                onClick={handleCloseConfirm}
                variant="outlined"
                color="inherit"
                sx={{ borderRadius: "8px" }}
              >
                Hủy bỏ
              </Button>
              <Button
                onClick={handleConfirmSubmit}
                variant="contained"
                sx={{
                  backgroundColor: "#1C5B41",
                  "&:hover": { backgroundColor: "#154A32" },
                  borderRadius: "8px",
                }}
              >
                Xác nhận
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Container>
    </Box>
  );
}
