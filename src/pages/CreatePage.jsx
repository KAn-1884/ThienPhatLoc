import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  // Container, // <-- BỎ Container
  Paper, // <-- DÙNG Paper làm box 96%
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SaveIcon from "@mui/icons-material/Save";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { numberToVietnameseWords } from "../changeNum2Word/num2wod.jsx"; // Đảm bảo đường dẫn này đúng

// === Helper ===
const formatCurrency = (v) =>
  new Intl.NumberFormat("vi-VN").format(Number(v) || 0) + " đ";

const createEmptyRow = () => ({
  id: crypto.randomUUID(),
  name: "",
  unit: "",
  quantity: 1,
  materialPrice: 0,
  laborPrice: 0,
  note: "",
});

export default function CreatePage() {
  const [project, setProject] = useState("");
  const [category, setCategory] = useState("");
  const [workItems, setWorkItems] = useState([createEmptyRow()]);
  const [openDialog, setOpenDialog] = useState(false); // <--- State cho Dialog

  const handleChange = (name, value, id) => {
    setWorkItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [name]: value } : item))
    );
  };

  const addRow = () => setWorkItems((p) => [...p, createEmptyRow()]);
  const removeRow = (id) =>
    setWorkItems((p) => p.filter((item) => item.id !== id));

  const totalCost = workItems.reduce((sum, item) => {
    const materialTotal = Number(item.quantity) * Number(item.materialPrice);
    const laborTotal = Number(item.quantity) * Number(item.laborPrice);
    return sum + materialTotal + laborTotal;
  }, 0);

  // === Xử lý Dialog ===
  const handleSave = () => {
    // Logic lưu dữ liệu của bạn sẽ ở đây
    // ...
    // Sau khi lưu, mở dialog
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Tùy chọn: reset form hoặc chuyển trang tại đây
  };

  const tableInputSx = {
    "& .MuiInputBase-root:before": { borderBottom: "1px solid #E5E7EB" },
    "& .MuiInputBase-root:hover:not(.Mui-disabled):before": {
      borderBottom: "1px solid #000000",
    },
    "& .MuiInputBase-root:after": { borderBottom: "1px solid #E5E7EB" },
    "& input": { fontSize: "0.875rem", padding: "6px 8px" },
  };

  const tableHeaderSx = {
    backgroundColor: "#1C5B41",
    color: "white",
    fontWeight: "bold",
    borderBottom: "1px solid #E5E7EB",
    padding: "10px 8px",
    textAlign: "center",
    fontSize: "0.8rem",
  };

  return (
    // Bỏ Box nền xám và Container, thay bằng Fragment
    <>
      {/* Đây là Box trắng 96% bạn muốn */}
      <Paper
        sx={{
          // === LOGIC 96% CỦA BẠN ===
          width: { xs: "100%", md: "96%" }, // 96% trên desktop
          margin: "0 auto", // Căn giữa
          boxSizing: "border-box",

          // === Style cũ của Paper (giữ nguyên) ===
          p: { xs: 2, md: 4 },
          borderRadius: "12px",
          backgroundColor: "#FFF",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="#2D5F3F"
          textAlign="center"
          fontSize="32px"
          mb={4}
        >
          TẠO CÔNG VIỆC MỚI
        </Typography>

        {/* --- Chọn dự án & hạng mục --- */}
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            backgroundColor: "#F7FAFC",
            mb: 4,
          }}
        >
          {/* === ITEM 1 - Chọn Dự án === */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Typography
              sx={{
                minWidth: "150px",
                fontWeight: 500,
                color: "#333",
                whiteSpace: "nowrap",
              }}
            >
              Chọn Dự án <span style={{ color: "#E53E3E" }}>*</span>:
            </Typography>
            <FormControl fullWidth variant="outlined">
              <Select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                displayEmpty
                sx={{
                  backgroundColor: "white",
                  "& .MuiSelect-select": {
                    color: project ? "#333" : "#A0AEC0",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  -- Chọn dự án --
                </MenuItem>
                <MenuItem value={10}>Dự án A (The Aqua)</MenuItem>
                <MenuItem value={20}>Dự án B (Vinhomes)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* === ITEM 2 - Chọn Hạng mục === */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              sx={{
                minWidth: "150px",
                fontWeight: 500,
                color: "#333",
                whiteSpace: "nowrap",
              }}
            >
              Chọn Hạng mục <span style={{ color: "#E53E3E" }}>*</span>:
            </Typography>
            <FormControl fullWidth variant="outlined">
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                displayEmpty
                sx={{
                  backgroundColor: "white",
                  "& .MuiSelect-select": {
                    color: category ? "#333" : "#A0AEC0",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  -- Chọn hạng mục --
                </MenuItem>
                <MenuItem value={10}>Hạng mục 1 (Xây thô)</MenuItem>
                <MenuItem value={20}>Hạng mục 2 (Hoàn thiện)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* --- Bảng công việc --- */}
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 0 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2} sx={{ ...tableHeaderSx, width: "40px" }}>
                  STT
                </TableCell>
                <TableCell rowSpan={2} sx={{ ...tableHeaderSx, minWidth: 200 }}>
                  TÊN CÔNG VIỆC
                </TableCell>
                <TableCell rowSpan={2} sx={{ ...tableHeaderSx, width: "80px" }}>
                  ĐƠN VỊ
                </TableCell>
                <TableCell
                  rowSpan={2}
                  sx={{ ...tableHeaderSx, width: "100px" }}
                >
                  KHỐI LƯỢNG
                </TableCell>
                <TableCell colSpan={2} sx={{ ...tableHeaderSx }}>
                  ĐƠN GIÁ
                </TableCell>
                <TableCell colSpan={2} sx={{ ...tableHeaderSx }}>
                  THÀNH TIỀN
                </TableCell>
                <TableCell rowSpan={2} sx={{ ...tableHeaderSx, minWidth: 150 }}>
                  GHI CHÚ
                </TableCell>
                <TableCell
                  rowSpan={2}
                  sx={{ ...tableHeaderSx, width: "100px" }}
                >
                  THAO TÁC
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell sx={{ ...tableHeaderSx }}>VẬT LIỆU</TableCell>
                <TableCell sx={{ ...tableHeaderSx }}>NHÂN CÔNG</TableCell>
                <TableCell sx={{ ...tableHeaderSx }}>VẬT LIỆU</TableCell>
                <TableCell sx={{ ...tableHeaderSx }}>NHÂN CÔNG</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {workItems.map((row, i) => {
                const materialTotal =
                  Number(row.quantity) * Number(row.materialPrice);
                const laborTotal =
                  Number(row.quantity) * Number(row.laborPrice);

                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F9FAFB",
                      "&:hover": { backgroundColor: "#E8F5E9" },
                      "& .MuiTableCell-root": {
                        borderBottom: "1px solid #E5E7EB",
                        padding: "4px 8px",
                      },
                    }}
                  >
                    <TableCell align="center">{i + 1}</TableCell>

                    <TableCell>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={row.name}
                        onChange={(e) =>
                          handleChange("name", e.target.value, row.id)
                        }
                        placeholder="Nhập tên công việc"
                        sx={tableInputSx}
                      />
                    </TableCell>

                    <TableCell>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={row.unit}
                        onChange={(e) =>
                          handleChange("unit", e.target.value, row.id)
                        }
                        placeholder="Công"
                        sx={tableInputSx}
                      />
                    </TableCell>

                    <TableCell>
                      <TextField
                        variant="standard"
                        fullWidth
                        type="number"
                        value={row.quantity}
                        onChange={(e) =>
                          handleChange("quantity", e.target.value, row.id)
                        }
                        sx={{
                          ...tableInputSx,
                          "& input": { textAlign: "right" },
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <TextField
                        variant="standard"
                        fullWidth
                        type="number"
                        value={row.materialPrice}
                        onChange={(e) =>
                          handleChange("materialPrice", e.target.value, row.id)
                        }
                        sx={{
                          ...tableInputSx,
                          "& input": { textAlign: "right" },
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <TextField
                        variant="standard"
                        fullWidth
                        type="number"
                        value={row.laborPrice}
                        onChange={(e) =>
                          handleChange("laborPrice", e.target.value, row.id)
                        }
                        sx={{
                          ...tableInputSx,
                          "& input": { textAlign: "right" },
                        }}
                      />
                    </TableCell>

                    <TableCell align="right" sx={{ fontSize: "0.875rem" }}>
                      {new Intl.NumberFormat("vi-VN").format(materialTotal)}
                    </TableCell>

                    <TableCell align="right" sx={{ fontSize: "0.875rem" }}>
                      {new Intl.NumberFormat("vi-VN").format(laborTotal)}
                    </TableCell>

                    <TableCell>
                      <TextField
                        variant="standard"
                        fullWidth
                        value={row.note}
                        onChange={(e) =>
                          handleChange("note", e.target.value, row.id)
                        }
                        placeholder="Nhập ghi chú"
                        sx={tableInputSx}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteOutlineIcon fontSize="small" />}
                        onClick={() => removeRow(row.id)}
                        sx={{
                          borderColor: "#CBD5E1",
                          color: "#475569",
                          textTransform: "none",
                          borderRadius: "6px",
                          padding: "2px 8px",
                          fontSize: "0.75rem",
                        }}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* --- Nút thêm dòng --- */}
        <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={addRow}
            sx={{
              border: "2px dashed #1C5B41",
              color: "#1C5B41",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "10px",
            }}
          >
            Thêm dòng mới
          </Button>
        </Box>

        {/* --- Tổng cộng --- */}
        <Box
          sx={{
            mt: 2,
            backgroundColor: "#e3fae7ff",
          }}
        >
          <Box
            sx={{
              p: 2.5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
              borderBottom: "2px solid #2D5F3F",
              borderTop: "2px solid #2D5F3F",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              TỔNG CỘNG
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#1C5B41" }}
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
        </Box>
        <Box sx={{ p: 2.5 }}>
          <Button
            variant="outlined"
            startIcon={<AttachFileIcon />}
            component="label"
            sx={{
              textTransform: "none",
              color: "#1C5B41",
              fontWeight: 600,
              border: "2px dashed #1C5B41",
              borderRadius: "10px",
            }}
          >
            Đính kèm tệp
            <input type="file" hidden multiple />
          </Button>
        </Box>

        {/* --- Nút hành động --- */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#475569",
              color: "white",
              textTransform: "none",
              fontWeight: 600,
              padding: "8px 20px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#334155" },
            }}
          >
            Lưu nháp
          </Button>

          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave} // <--- Thêm onClick
            sx={{
              backgroundColor: "#1C5B41",
              textTransform: "none",
              fontWeight: 600,
              padding: "8px 20px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#154A32" },
            }}
          >
            Lưu & Tiếp tục
          </Button>
        </Box>
      </Paper>

      {/* === PHẦN DIALOG (POP-UP) === */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            padding: "16px",
            alignItems: "center",
            minWidth: "300px",
          },
        }}
      >
        <DialogContent sx={{ textAlign: "center", p: 2 }}>
          <CheckCircleOutlineIcon
            sx={{ fontSize: 60, color: "#4CAF50", mb: 2 }}
          />
          <Typography variant="h6" fontWeight="600" color="#333">
            Công việc sẽ được xem xét!
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", p: 0, pb: 2 }}>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            sx={{
              backgroundColor: "#4CAF50",
              color: "white",
              textTransform: "none",
              fontWeight: 600,
              padding: "6px 24px",
              "&:hover": {
                backgroundColor: "#388E3C",
              },
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
