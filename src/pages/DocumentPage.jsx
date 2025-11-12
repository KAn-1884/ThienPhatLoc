import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Menu,
  Grid,
  Card,
  CardContent,
  Tooltip,
} from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DescriptionIcon from "@mui/icons-material/Description";
import {
  Search as SearchIcon,
  UploadFile as UploadFileIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  MoreVert as MoreVertIcon,
  PictureAsPdf as PictureAsPdfIcon,
  Article as ArticleIcon,
  Image as ImageIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  DriveFileRenameOutline as EditIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { mockDocuments } from "../data/mockDocuments.js";

/* ---------------- ICON + LABEL HELPER ---------------- */
const getFileIcon = (type, size = "medium") => {
  const fileType = type.toLowerCase();
  let icon, color;

  if (fileType.includes("pdf")) {
    icon = <PictureAsPdfIcon fontSize="inherit" />;
    color = "#D32F2F";
  } else if (fileType.includes("doc")) {
    icon = <DescriptionIcon fontSize="inherit" />;
    color = "#1976D2";
  } else if (fileType.includes("xls")) {
    icon = <TableChartIcon fontSize="inherit" />;
    color = "#2E7D32";
  } else if (["jpg", "jpeg", "png"].some((ext) => fileType.includes(ext))) {
    icon = <ImageIcon fontSize="inherit" />;
    color = "#ED6C02";
  } else if (["dwg", "dwf"].some((ext) => fileType.includes(ext))) {
    icon = <InsertDriveFileIcon fontSize="inherit" />;
    color = "#7B1FA2";
  } else {
    icon = <ArticleIcon fontSize="inherit" />;
    color = "action.active";
  }

  return (
    <Box sx={{ color: color, fontSize: size === "large" ? 48 : 24 }}>
      {icon}
    </Box>
  );
};

const getFileTypeLabel = (type) => {
  const fileType = type.toLowerCase();
  if (fileType.includes("pdf")) return "PDF";
  if (fileType.includes("doc")) return "Tài liệu";
  if (fileType.includes("xls")) return "Bảng tính";
  if (["jpg", "jpeg", "png"].some((ext) => fileType.includes(ext)))
    return "Hình ảnh";
  return "Tệp";
};

/* ---------------- DOCUMENT GRID CARD ---------------- */
function DocumentGridCard({ document }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleAction = (action) => {
    console.log(`Grid: Thực hiện ${action} cho file: ${document.name}`);
    handleMenuClose();
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: "12px",
        height: "100%",
        minHeight: 200,
        display: "flex",
        flexDirection: "column",
        borderColor: "#e0e0e0",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardContent
        sx={{
          p: 2,
          pb: 1,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* --- Icon + Menu --- */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1,
          }}
        >
          {getFileIcon(document.type, "large")}
          <IconButton size="small" onClick={handleMenuClick} sx={{ mt: -1 }}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* --- Tên tài liệu --- */}
        <Box
          sx={{ flexGrow: 1, display: "flex", alignItems: "center", mb: 0.5 }}
        >
          <Tooltip title={document.name} arrow>
            <Typography
              variant="body2"
              fontWeight="medium"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                wordBreak: "break-word",
                textAlign: "center",
                width: "100%",
                lineHeight: 1.4,
              }}
            >
              {document.name}
            </Typography>
          </Tooltip>
        </Box>

        {/* --- Thông tin phụ --- */}
        <Typography variant="caption" color="text.secondary" textAlign="center">
          {document.size}
        </Typography>
      </CardContent>

      {/* --- Menu thao tác --- */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleAction("open")}>
          <VisibilityIcon sx={{ mr: 1.5 }} fontSize="small" /> Mở
        </MenuItem>
        <MenuItem onClick={() => handleAction("download")}>
          <DownloadIcon sx={{ mr: 1.5 }} fontSize="small" /> Tải xuống
        </MenuItem>
        <MenuItem onClick={() => handleAction("rename")}>
          <EditIcon sx={{ mr: 1.5 }} fontSize="small" /> Đổi tên
        </MenuItem>
        <MenuItem onClick={() => handleAction("share")}>
          <ShareIcon sx={{ mr: 1.5 }} fontSize="small" /> Chia sẻ
        </MenuItem>
        <MenuItem
          onClick={() => handleAction("delete")}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon sx={{ mr: 1.5 }} fontSize="small" /> Xóa
        </MenuItem>
      </Menu>
    </Card>
  );
}

/* ---------------- MAIN DOCUMENT PAGE ---------------- */
export default function DocumentPage() {
  const [view, setView] = useState("list");
  const [filterType, setFilterType] = useState("");
  const [filterOwner, setFilterOwner] = useState("");
  const [filterModified, setFilterModified] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event, docId) => {
    setAnchorEl(event.currentTarget);
    setSelectedDocId(docId);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDocId(null);
  };
  const handleListAction = (action) => {
    const doc = mockDocuments.find((d) => d.id === selectedDocId);
    if (doc) {
      console.log(`List: Thực hiện ${action} cho file: ${doc.name}`);
    }
    handleMenuClose();
  };
  const handleViewChange = (event, nextView) => {
    if (nextView !== null) setView(nextView);
  };

  const headCells = [
    { id: "name", label: "TÊN" },
    { id: "owner", label: "CHỦ SỞ HỮU" },
    { id: "lastModified", label: "NGÀY SỬA ĐỔI" },
    { id: "size", label: "KÍCH CỠ TỆP" },
    { id: "actions", label: "" },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* --- Header --- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Tài liệu
        </Typography>
        <Button
          variant="contained"
          startIcon={<UploadFileIcon />}
          sx={{
            backgroundColor: "#1C5B41",
            "&:hover": { backgroundColor: "#154A32" },
            borderRadius: "8px",
            textTransform: "none",
          }}
        >
          Tải tài liệu lên
        </Button>
      </Box>

      {/* --- Bộ lọc và tìm kiếm --- */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Tìm tài liệu"
          size="small"
          sx={{ flexGrow: 1, minWidth: "250px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: { borderRadius: "8px" },
          }}
        />

        {/* Dropdowns */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Loại</InputLabel>
          <Select
            value={filterType}
            label="Loại"
            onChange={(e) => setFilterType(e.target.value)}
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="">
              <em>Tất cả</em>
            </MenuItem>
            <MenuItem value="pdf">PDF</MenuItem>
            <MenuItem value="docx">Tài liệu (Word)</MenuItem>
            <MenuItem value="xlsx">Bảng tính (Excel)</MenuItem>
            <MenuItem value="image">Hình ảnh</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Người</InputLabel>
          <Select
            value={filterOwner}
            label="Người"
            onChange={(e) => setFilterOwner(e.target.value)}
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="">
              <em>Tất cả</em>
            </MenuItem>
            <MenuItem value="Tôi">Tôi</MenuItem>
            <MenuItem value="Nguyễn Văn An">Nguyễn Văn An</MenuItem>
            <MenuItem value="Trần Thị Bình">Trần Thị Bình</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Lần sửa đổi</InputLabel>
          <Select
            value={filterModified}
            label="Lần sửa đổi"
            onChange={(e) => setFilterModified(e.target.value)}
            sx={{ borderRadius: "8px" }}
          >
            <MenuItem value="">
              <em>Bất kỳ lúc nào</em>
            </MenuItem>
            <MenuItem value="today">Hôm nay</MenuItem>
            <MenuItem value="yesterday">Hôm qua</MenuItem>
            <MenuItem value="7days">7 ngày qua</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ flexGrow: 1 }} />

        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          size="small"
        >
          <ToggleButton value="list">
            <ViewListIcon />
          </ToggleButton>
          <ToggleButton value="grid">
            <ViewModuleIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>

      {/* --- Hiển thị danh sách hoặc grid --- */}
      {view === "list" ? (
        <Paper
          sx={{
            overflow: "hidden",
            borderRadius: "12px",
            border: "1px solid #e0e0e0",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#f9fafb" }}>
                <TableRow>
                  {headCells.map((cell) => (
                    <TableCell
                      key={cell.id}
                      sx={{
                        fontWeight: 600,
                        color: "#6b7280",
                        py: 1.5,
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      {cell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {mockDocuments.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {getFileIcon(row.type)}
                        <Box sx={{ ml: 1.5 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {row.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {getFileTypeLabel(row.type)}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {row.owner === "Tôi" ? (
                          <Avatar
                            sx={{
                              bgcolor: "#ffb74d",
                              width: 28,
                              height: 28,
                              fontSize: "0.875rem",
                            }}
                          >
                            T
                          </Avatar>
                        ) : (
                          <Avatar
                            sx={{ bgcolor: "#e0e0e0", width: 28, height: 28 }}
                          />
                        )}
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {row.owner}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {row.lastModified}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {row.size}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={(e) => handleMenuClick(e, row.id)}>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)", // Mobile: 2 cards/row
              sm: "repeat(3, 1fr)", // Tablet: 3 cards/row
              md: "repeat(4, 1fr)", // Medium: 4 cards/row
              lg: "repeat(6, 1fr)", // Desktop: 6 cards/row
            },
            gap: 2,
          }}
        >
          {mockDocuments.map((document) => (
            <Box key={document.id}>
              <DocumentGridCard document={document} />
            </Box>
          ))}
        </Box>
      )}

      {/* --- Menu list actions --- */}
      <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleListAction("open")}>
          <VisibilityIcon sx={{ mr: 1.5 }} fontSize="small" /> Mở
        </MenuItem>
        <MenuItem onClick={() => handleListAction("download")}>
          <DownloadIcon sx={{ mr: 1.5 }} fontSize="small" /> Tải xuống
        </MenuItem>
        <MenuItem onClick={() => handleListAction("rename")}>
          <EditIcon sx={{ mr: 1.5 }} fontSize="small" /> Đổi tên
        </MenuItem>
        <MenuItem onClick={() => handleListAction("share")}>
          <ShareIcon sx={{ mr: 1.5 }} fontSize="small" /> Chia sẻ
        </MenuItem>
        <MenuItem
          onClick={() => handleListAction("delete")}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon sx={{ mr: 1.5 }} fontSize="small" /> Xóa
        </MenuItem>
      </Menu>
    </Container>
  );
}
