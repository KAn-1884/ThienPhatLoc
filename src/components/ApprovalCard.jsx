import React from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Divider,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { numberToVietnameseWords } from "../changeNum2Word/num2wod.jsx";
import checktickIcon from "../assets/img/checktickIcon.svg";
import { getApprovalData } from "../data/approvalMockData.js";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "—";
  try {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  } catch (e) {
    return e.dateString;
  }
};

const formatCurrency = (v) =>
  new Intl.NumberFormat("vi-VN").format(Number(v) || 0) + " đ";

const InfoRow = ({ label, value }) => (
  <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
    <Typography sx={{ minWidth: 120, fontWeight: 600 }}>{label}:</Typography>
    <Typography sx={{ ml: 2, wordBreak: "break-word" }}>{value}</Typography>
  </Box>
);
// =============================================

export default function ApprovalCard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { projectId } = useParams();

  let data = location.state;
  if (!data && projectId) {
    data = getApprovalData(projectId);
  }

  const { formData, workItems, totalCost, approvalState } = data || {};

  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const handleOpenSubmit = () => setOpenSubmitDialog(true);
  const handleCloseSubmit = () => setOpenSubmitDialog(false);

  const handleCloseSuccess = () => {
    setOpenSuccessDialog(false);
    navigate("/"); // Về trang chủ
  };

  const handleConfirmSubmit = () => {
    handleCloseSubmit();
    console.log("Đã gửi duyệt biểu mẫu!");
    setOpenSuccessDialog(true);
  };

  const getApprovalDate = () => {
    const d = new Date();
    return `Ngày ${d.getDate()} tháng ${
      d.getMonth() + 1
    } năm ${d.getFullYear()}`;
  };

  if (!formData) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography>
          {projectId
            ? `Không tìm thấy dữ liệu duyệt cho dự án ID: ${projectId}`
            : "Bạn chưa nhập dữ liệu biểu mẫu."}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2, backgroundColor: "#1C5B41" }}
          onClick={() => navigate(-1)} // Quay lại
        >
          Quay lại
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            borderBottom: "4px solid rgba(17, 106, 1, 1)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="#2D5F3F"
            textAlign="center"
            mb={2}
          >
            PHIẾU DUYỆT CHI PHÍ THI CÔNG
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
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: "#F7FAFC",
              mb: 4,
              textAlign: "left",
            }}
          >
            <InfoRow label="Dự án" value={formData.project || "—"} />
            <InfoRow label="Địa điểm" value={formData.address || "—"} />
            <InfoRow
              label="Thời gian"
              value={
                formData.dateFrom
                  ? `${formatDisplayDate(
                      formData.dateFrom
                    )} - ${formatDisplayDate(formData.dateTo)}`
                  : "—"
              }
            />
            <InfoRow label="Đợt" value={formData.batch || "—"} />
          </Box>

          <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      width: "5%",
                      borderBottom: "1px solid #E5E7EB",
                      backgroundColor: "#2D5F3F",
                      fontWeight: 600,
                      color: "white",
                    }}
                  >
                    STT
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "40%",
                      borderBottom: "1px solid #E5E7EB",
                      backgroundColor: "#2D5F3F",
                      fontWeight: 600,
                      color: "white",
                    }}
                  >
                    CÔNG VIỆC
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "20%",
                      borderBottom: "1px solid #E5E7EB",
                      backgroundColor: "#2D5F3F",
                      fontWeight: 600,
                      color: "white",
                    }}
                  >
                    SỐ TIỀN
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "35%",
                      borderBottom: "1px solid #E5E7EB",
                      backgroundColor: "#2D5F3F",
                      fontWeight: 600,
                      color: "white",
                    }}
                  >
                    GHI CHÚ
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {workItems?.map((row, i) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      // === KHÔI PHỤC LẠI LOGIC CŨ CHO FILE NÀY ===
                      // STT 1 (index 0) màu nhạt, STT 2 (index 1) màu trắng
                      backgroundColor: i % 2 === 0 ? "#F7FAFC" : "#FFFFFF",
                    }}
                  >
                    <TableCell sx={{ borderBottom: "1px solid #E5E7EB" }}>
                      {i + 1}
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #E5E7EB" }}>
                      {row.name || "—"}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ borderBottom: "1px solid #E5E7EB" }}
                    >
                      {formatCurrency(row.cost)}
                    </TableCell>
                    <TableCell sx={{ borderBottom: "1px solid #E5E7EB" }}>
                      {row.note || ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* --- Tổng cộng --- */}
          <Box
            sx={{
              borderTop: "4px solid #2D5F3F",
              backgroundColor: "#F8FAFC",
              p: 3,
              borderBottom: "1px solid #E2E8F0",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              TỔNG CỘNG
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#2D5F3F" }}
              >
                {formatCurrency(totalCost)}
              </Typography>
              <Box
                sx={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  backgroundColor: "text.secondary",
                  opacity: "0.7",
                  mx: 0.5,
                }}
              />
              <Typography variant="body2" sx={{ color: "#475569" }}>
                {numberToVietnameseWords(totalCost)}
              </Typography>
            </Box>
          </Box>

          {/* --- Ký duyệt --- */}
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: "#f9fafb",
              mt: 4,
              textAlign: "center",
            }}
          >
            <Typography mb={3} fontStyle="italic">
              {getApprovalDate()}
            </Typography>
            <Grid
              container
              spacing={2}
              textAlign="center"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Grid item xs={12} sm={6} md={3}>
                <Typography fontWeight="bold" variant="body2" gutterBottom>
                  NGƯỜI LẬP
                </Typography>
                <Typography>{formData.creator}</Typography>
              </Grid>
              {[
                { label: "CHỈ HUY TRƯỞNG", field: "chief" },
                { label: "KẾ TOÁN", field: "accountant" },
                { label: "GIÁM ĐỐC", field: "director" },
              ].map(({ label, field }) => (
                <Grid item xs={12} sm={6} md={3} key={field}>
                  <Typography fontWeight="bold" variant="body2" gutterBottom>
                    {label}
                  </Typography>
                  <Typography>
                    {approvalState?.[field] || "________________"}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>

        {/* --- Nút hành động --- */}
        {!projectId && (
          <Box
            textAlign="center"
            mt={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{
                backgroundColor: "#1C5B41",
                textTransform: "none",
                px: 4,
                py: 1.2,
                fontWeight: 600,
                "&:hover": { backgroundColor: "#154A32" },
              }}
              onClick={handleOpenSubmit}
            >
              Gửi duyệt
            </Button>
          </Box>
        )}
      </Container>

      {/* --- Dialog 1: Xác nhận gửi --- */}
      <Dialog
        open={openSubmitDialog}
        onClose={handleCloseSubmit}
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
            onClick={handleCloseSubmit}
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

      {/* --- Dialog 2: Báo thành công --- */}
      <Dialog
        open={openSuccessDialog}
        onClose={handleCloseSuccess}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent sx={{ textAlign: "center", py: 4, pt: 5 }}>
          <img
            src={checktickIcon}
            alt="Check tick"
            style={{ width: "103px", height: "95px" }}
          />
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Gửi duyệt thành công!
          </Typography>
          <Typography>
            Biểu mẫu chi phí đã được gửi đi để chờ xét duyệt.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button
            onClick={handleCloseSuccess}
            variant="contained"
            sx={{
              backgroundColor: "#1C5B41",
              "&:hover": { backgroundColor: "#154A32" },
              borderRadius: "8px",
            }}
          >
            Đã hiểu
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
