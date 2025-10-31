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
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate, Outlet } from "react-router-dom";
import { numberToVietnameseWords } from "../changeNum2Word/num2wod.jsx";

const formatCurrency = (v) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    Number(v) || 0
  );

export default function CreateCard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    project: "",
    address: "",
    dateFrom: "",
    dateTo: "",
    batch: "",
  });
  const [workItems, setWorkItems] = useState(
    Array(5)
      .fill()
      .map((_, i) => ({ id: i + 1, name: "", cost: 0, note: "" }))
  );

  const handleChange = (name, value, index = null) => {
    if (index === null) setFormData((p) => ({ ...p, [name]: value }));
    else
      setWorkItems((prev) =>
        prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
      );
  };

  const totalCost = workItems.reduce((sum, i) => sum + Number(i.cost), 0);

  const addRow = () =>
    setWorkItems((p) => [
      ...p,
      { id: Date.now(), name: "", cost: 0, note: "" },
    ]);
  const removeRow = (index) =>
    setWorkItems((p) => p.filter((_, i) => i !== index));

  const handleContinue = () => {
    navigate("approval", { state: { formData, workItems, totalCost } });
  };

  // Hàm render 1 hàng (thay cho Grid item)
  const renderField = (label, name, placeholder, fullWidth = true) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2, // Thêm khoảng cách
      }}
    >
      <Typography sx={{ minWidth: 120, fontWeight: 600 }}>{label}:</Typography>
      <TextField
        variant="standard"
        name={name}
        value={formData[name]}
        onChange={(e) => handleChange(name, e.target.value)}
        placeholder={placeholder}
        fullWidth={fullWidth}
        sx={{ ml: 2 }}
      />
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            borderBottom: " 4px solid  rgba(17, 106, 10, 1)",
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

          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              backgroundColor: "#f9fafb",
              mb: 4,
              textAlign: "left",
            }}
          >
            {renderField("Dự án", "project", "Nhập tên dự án")}
            {renderField("Địa điểm", "address", "Nhập địa điểm")}{" "}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
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
                  sx={{ width: 140 }}
                />
                <Typography> - </Typography>
                <TextField
                  type="date"
                  variant="standard"
                  value={formData.dateTo}
                  onChange={(e) => handleChange("dateTo", e.target.value)}
                  sx={{ width: 140 }}
                />
              </Box>
            </Box>
            {/* HÀNG 4: ĐỢT */}
            {renderField("Đợt", "batch", "Nhập thông tin")}
            {/* --- KẾT THÚC SỬA --- */}
          </Box>

          <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead sx={{ backgroundColor: "#2D5F3F" }}>
                <TableRow>
                  {["STT", "CÔNG VIỆC", "SỐ TIỀN", "GHI CHÚ", "THAO TÁC"].map(
                    (h) => (
                      <TableCell
                        key={h}
                        sx={{ color: "#fff", fontWeight: "bold" }}
                      >
                        {h}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {workItems.map((row, i) => (
                  <TableRow key={row.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>
                      <TextField
                        variant="standard"
                        fullWidth
                        name="name"
                        value={row.name}
                        onChange={(e) =>
                          handleChange("name", e.target.value, i)
                        }
                        placeholder="Nhập công việc"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        variant="standard"
                        fullWidth
                        type="number"
                        name="cost"
                        value={row.cost}
                        onChange={(e) =>
                          handleChange("cost", e.target.value, i)
                        }
                        sx={{
                          "& input": { textAlign: "right", fontWeight: 500 },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        variant="standard"
                        fullWidth
                        name="note"
                        value={row.note}
                        onChange={(e) =>
                          handleChange("note", e.target.value, i)
                        }
                        placeholder="Ghi chú"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton color="error" onClick={() => removeRow(i)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box textAlign="center" mb={3}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addRow}
              sx={{
                borderStyle: "dashed",
                textTransform: "none",
                "&:hover": { backgroundColor: "#f9f9f9" },
              }}
            >
              Thêm dòng mới
            </Button>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              backgroundColor: "#f9fafb",
              p: 2,
              borderRadius: 2,
              mb: 3,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Tổng cộng:{" "}
              <Box component="span" sx={{ color: "#2D5F3F" }}>
                {formatCurrency(totalCost)}
                <Typography fontStyle="italic">
                  {numberToVietnameseWords(totalCost)}
                </Typography>
              </Box>
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              startIcon={<AttachFileIcon />}
              component="label"
              sx={{ borderStyle: "dashed", textTransform: "none" }}
            >
              Đính kèm tệp
              <input type="file" hidden multiple />
            </Button>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#b0bec5" }}
                startIcon={<SaveIcon />}
              >
                Lưu nháp
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#1C5B41" }}
                startIcon={<SaveIcon />}
                onClick={handleContinue}
              >
                Lưu & Tiếp tục
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
      <Outlet />
    </Box>
  );
}
