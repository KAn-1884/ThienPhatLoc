import { useState } from "react";
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
  TextField,
  Divider,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate, Outlet } from "react-router-dom";
import { numberToVietnameseWords } from "../changeNum2Word/num2wod.jsx";

const formatCurrency = (v) =>
  new Intl.NumberFormat("vi-VN").format(Number(v) || 0) + " đ";

function ApprovalSelect({ label, value, onChange }) {
  const approverList = [
    { id: 1, name: "Nguyễn Văn A" },
    { id: 2, name: "Trần Thị B" },
    { id: 3, name: "Lê Văn C" },
  ];

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Typography fontWeight="bold" variant="body2" gutterBottom>
        {label}
      </Typography>
      <FormControl variant="standard" fullWidth size="small">
        <InputLabel id={`${label}-select-label`}>Chọn</InputLabel>
        <Select
          labelId={`${label}-select-label`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          label="Chọn người duyệt"
        >
          <MenuItem value="">
            <em>Chưa chọn</em>
          </MenuItem>
          {approverList.map((approver) => (
            <MenuItem key={approver.id} value={approver.name}>
              {approver.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}

export default function CreateCard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    project: "",
    address: "",
    dateFrom: "",
    dateTo: "",
    batch: "",
    creator: "Lê Văn Bằng",
  });

  const [workItems, setWorkItems] = useState(
    Array(5)
      .fill()
      .map(() => ({
        id: crypto.randomUUID(),
        name: "",
        cost: 0,
        note: "",
      }))
  );

  // Hàm này đã đúng (nhận id)
  const handleChange = (name, value, id = null) => {
    if (id === null) {
      setFormData((p) => ({ ...p, [name]: value }));
    } else {
      setWorkItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, [name]: value } : item))
      );
    }
  };

  const totalCost = workItems.reduce((sum, i) => sum + Number(i.cost), 0);

  const addRow = () =>
    setWorkItems((p) => [
      ...p,
      {
        id: crypto.randomUUID(),
        name: "",
        cost: 0,
        note: "",
      },
    ]);

  const removeRow = (id) =>
    setWorkItems((p) => p.filter((item) => item.id !== id));

  const handleContinue = () => {
    navigate("approval", {
      state: { formData, workItems, totalCost, approvalState },
    });
  };

  // --- Khu vực ký duyệt ---
  const approvals = [
    { label: "CHỈ HUY TRƯỞNG", field: "chief" },
    { label: "KẾ TOÁN", field: "accountant" },
    { label: "GIÁM ĐỐC", field: "director" },
  ];

  const [approvalState, setApprovalState] = useState({
    chief: "",
    accountant: "",
    director: "",
  });

  const handleApprovalChange = (field) => (value) =>
    setApprovalState((prev) => ({ ...prev, [field]: value }));

  const getApprovalDate = () => {
    const d = new Date();
    return `Ngày ${d.getDate()} tháng ${
      d.getMonth() + 1
    } năm ${d.getFullYear()}`;
  };

  const renderField = (label, name, placeholder, fullWidth = true) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Typography sx={{ minWidth: 120, fontWeight: 600 }}>{label}:</Typography>
      <TextField
        variant="standard"
        name={name}
        value={formData[name]}
        onChange={(e) => handleChange(name, e.target.value)}
        placeholder={placeholder}
        fullWidth={fullWidth}
        sx={{
          ml: 2,
          "& .MuiInputBase-root:before": { borderBottom: "1px solid #E5E7EB" },
          "& .MuiInputBase-root:hover:not(.Mui-disabled):before": {
            borderBottom: "1px solid #000000ff",
          },
          "& .MuiInputBase-root:after": { borderBottom: "1px solid #E5E7EB" },
        }}
      />
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: "#ffffffff", minHeight: "100vh" }}>
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

          {/* === Form thông tin dự án === */}
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: "#F7FAFC",
              mb: 4,
              textAlign: "left",
            }}
          >
            {renderField("Dự án", "project", "Nhập tên dự án")}
            {renderField("Địa điểm", "address", "Nhập địa điểm")}

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography sx={{ minWidth: 120, fontWeight: 600 }}>
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
                  type="date"
                  variant="standard"
                  value={formData.dateFrom}
                  onChange={(e) => handleChange("dateFrom", e.target.value)}
                  sx={{
                    width: 140,
                    "& .MuiInputBase-root:before": {
                      borderBottom: "1px solid #E5E7EB", // ✅ mờ như phần trên
                    },
                    "& .MuiInputBase-root:hover:not(.Mui-disabled):before": {
                      borderBottom: "1px solid #000000", // đậm khi hover
                    },
                    "& .MuiInputBase-root:after": {
                      borderBottom: "1px solid #E5E7EB",
                    },
                  }}
                />
                <TextField
                  type="date"
                  variant="standard"
                  value={formData.dateTo}
                  onChange={(e) => handleChange("dateTo", e.target.value)}
                  sx={{
                    width: 140,
                    "& .MuiInputBase-root:before": {
                      borderBottom: "1px solid #E5E7EB",
                    },
                    "& .MuiInputBase-root:hover:not(.Mui-disabled):before": {
                      borderBottom: "1px solid #000000",
                    },
                    "& .MuiInputBase-root:after": {
                      borderBottom: "1px solid #E5E7EB",
                    },
                  }}
                />
              </Box>
            </Box>

            {renderField("Đợt", "batch", "Nhập thông tin")}
          </Box>

          {/* === Bảng công việc === */}
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 0 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {["STT", "CÔNG VIỆC", "SỐ TIỀN", "GHI CHÚ", "THAO TÁC"].map(
                    (h) => (
                      <TableCell
                        key={h}
                        sx={{
                          borderBottom: "1px solid #E5E7EB",
                          backgroundColor: "#2D5F3F",
                          fontWeight: 600,
                          color: "white",
                        }}
                      >
                        {h}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {workItems.map((row, i) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F7FAFC",
                      "&:hover": { backgroundColor: "#E8F5E9" },
                    }}
                  >
                    {/* STT */}
                    <TableCell sx={{ borderBottom: "1px solid #E5E7EB" }}>
                      {i + 1}
                    </TableCell>

                    {/* CÔNG VIỆC */}
                    <TableCell sx={{ borderBottom: "1px solid #E5E7EB" }}>
                      <TextField
                        variant="standard"
                        fullWidth
                        name="name"
                        value={row.name}
                        // === SỬA 1: Dùng row.id thay vì i ===
                        onChange={(e) =>
                          handleChange("name", e.target.value, row.id)
                        }
                        placeholder="Nhập công việc"
                        sx={{
                          "& .MuiInputBase-root:before": {
                            borderBottom: "1px solid #E5E7EB",
                          },
                          "& .MuiInputBase-root:hover:not(.Mui-disabled):before":
                            {
                              borderBottom: "1px solid #000000",
                            },
                          "& .MuiInputBase-root:after": {
                            borderBottom: "1px solid #E5E7EB",
                          },
                        }}
                      />
                    </TableCell>

                    {/* SỐ TIỀN */}
                    <TableCell
                      align="right"
                      sx={{ borderBottom: "1px solid #E5E7EB" }}
                    >
                      <TextField
                        variant="standard"
                        fullWidth
                        type="number"
                        name="cost"
                        value={row.cost}
                        // === SỬA 2: Dùng row.id thay vì i ===
                        onChange={(e) =>
                          handleChange("cost", e.target.value, row.id)
                        }
                        sx={{
                          "& input": { textAlign: "right" },
                          "& .MuiInputBase-root:before": {
                            borderBottom: "1px solid #E5E7EB",
                          },
                          "& .MuiInputBase-root:hover:not(.Mui-disabled):before":
                            {
                              borderBottom: "1px solid #000000",
                            },
                          "& .MuiInputBase-root:after": {
                            borderBottom: "1px solid #E5E7EB",
                          },
                        }}
                      />
                    </TableCell>

                    {/* GHI CHÚ */}
                    <TableCell sx={{ borderBottom: "1px solid #E5E7EB" }}>
                      <TextField
                        variant="standard"
                        fullWidth
                        name="note"
                        value={row.note}
                        // === SỬA 3: Dùng row.id thay vì i ===
                        onChange={(e) =>
                          handleChange("note", e.target.value, row.id)
                        }
                        placeholder="Ghi chú"
                        sx={{
                          "& .MuiInputBase-root:before": {
                            borderBottom: "1px solid #E5E7EB",
                          },
                          "& .MuiInputBase-root:hover:not(.Mui-disabled):before":
                            {
                              borderBottom: "1px solid #000000",
                            },
                          "& .MuiInputBase-root:after": {
                            borderBottom: "1px solid #E5E7EB",
                          },
                        }}
                      />
                    </TableCell>

                    {/* THAO TÁC */}
                    <TableCell
                      align="center"
                      sx={{ borderBottom: "1px solid #E5E7EB" }}
                    >
                      <Button
                        variant="outlined"
                        startIcon={<DeleteOutlineIcon />}
                        onClick={() => removeRow(row.id)} // (Phần này đã đúng)
                        sx={{
                          borderColor: "#CBD5E1",
                          color: "#475569",
                          textTransform: "none",
                          borderRadius: "10px",
                          px: 1.5,
                          py: 0.5,
                        }}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* === Nút thêm dòng === */}
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addRow}
              sx={{
                border: "1px dashed #2D5F3F",
                color: "#2D5F3F",
                fontWeight: 600,
              }}
            >
              Thêm dòng mới
            </Button>
          </Box>

          {/* --- Tổng cộng --- */}
          <Box
            sx={{
              mt: 3,
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            <Box
              sx={{
                borderTop: "4px solid #2D5F3F",
                backgroundColor: "#F8FAFC",
                p: 3,
                borderBottom: "1px solid #E2E8F0",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
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
                    backgroundColor: "#94A3B8",
                    opacity: 0.7,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: "#475569",
                    fontStyle: "italic",
                    whiteSpace: "nowrap",
                  }}
                >
                  {numberToVietnameseWords(totalCost)}
                </Typography>
              </Box>
            </Box>

            {/* --- Đính kèm tệp --- */}
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                p: 2.5,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<AttachFileIcon />}
                component="label"
                sx={{
                  borderStyle: "dashed",
                  textTransform: "none",
                  borderColor: "#2D5F3F",
                  color: "#2D5F3F",
                }}
              >
                Đính kèm tệp
                <input type="file" hidden multiple />
              </Button>
            </Box>
          </Box>

          {/* --- Nút hành động --- */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mt: 3,
            }}
          >
            <Button variant="contained" sx={{ backgroundColor: "#b0bec5" }}>
              Lưu nháp
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#1C5B41" }}
              onClick={handleContinue}
            >
              Lưu & Tiếp tục
            </Button>
          </Box>

          {/* --- Khu vực ký duyệt --- */}
          <Box
            sx={{ p: 3, borderRadius: 2, backgroundColor: "#f9fafb", mt: 4 }}
          >
            <Typography textAlign="center" mb={3} fontStyle="italic">
              {getApprovalDate()}
            </Typography>
            <Grid
              container
              spacing={2}
              textAlign="center"
              justifyContent="space-evenly" // ✅ giãn đều các cột
              alignItems="center" // ✅ căn giữa dọc
            >
              <Grid item xs={12} sm={6} md={3}>
                <Typography fontWeight="bold" variant="body2" gutterBottom>
                  NGƯỜI LẬP
                </Typography>
                <Typography>{formData.creator}</Typography>
              </Grid>

              {approvals.map(({ label, field }) => (
                <ApprovalSelect
                  key={field}
                  label={label}
                  value={approvalState[field]}
                  onChange={handleApprovalChange(field)}
                />
              ))}
            </Grid>
          </Box>
        </Paper>
      </Container>
      <Outlet />
    </Box>
  );
}
