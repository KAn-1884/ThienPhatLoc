import React, { useState } from "react";
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
  useMediaQuery,
  useTheme,
  IconButton,
  Avatar,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { projectData } from "../data/projectData";
import { getFormattedWorkItems } from "../data/workItem";
import { getFormattedTaskData } from "../data/taskData";

// -------------------- Component con --------------------

const DetailRow = ({ label, value, valueColor }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 1.5,
      px: 2,
      "&:not(:last-of-type)": { borderBottom: "1px solid #E0E0E0" },
    }}
  >
    <Typography
      variant="body2"
      sx={{ color: "#1C5B41", fontWeight: "bold", textTransform: "uppercase" }}
    >
      {label}
    </Typography>
    <Typography
      variant="body1"
      sx={{
        fontWeight: valueColor ? "bold" : 500,
        color: valueColor || "text.primary",
      }}
    >
      {value}
    </Typography>
  </Box>
);

const ViewDetailRow = ({ taskCount, onClick }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 1.5,
      px: 2,
      borderTop: "1px solid #E0E0E0",
      cursor: "pointer",
      "&:hover": { bgcolor: "#f9f9f9" },
    }}
    onClick={onClick}
  >
    <Typography
      variant="body2"
      sx={{ color: "#1C5B41", fontWeight: "bold", textTransform: "uppercase" }}
    >
      Tổng số việc
    </Typography>

    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Avatar
        sx={{
          bgcolor: "#2196F3",
          width: 28,
          height: 28,
          fontSize: "0.875rem",
          fontWeight: "bold",
        }}
      >
        {taskCount}
      </Avatar>
      <ArrowForwardIcon sx={{ color: "action.disabled" }} />
    </Box>
  </Box>
);

const ViewDetailButton = ({ itemId, onClick }) => (
  <Button
    variant="text"
    endIcon={<ArrowForwardIcon />}
    onClick={(e) => {
      e.stopPropagation();
      onClick(itemId);
    }}
    sx={{
      color: "#1C5B41",
      fontWeight: "bold",
      textTransform: "none",
      fontSize: "1rem",
      "&:hover": { bgcolor: "transparent" },
      mt: 1,
    }}
  >
    Xem chi tiết công việc
  </Button>
);

// -------------------- Component chính --------------------

export default function CardDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const project = projectData.find((p) => p.id.toString() === projectId);
  const formattedWorkItems = getFormattedWorkItems(projectId);
  const [expandedItems, setExpandedItems] = useState({});

  const handleToggleExpand = (itemId) => {
    setExpandedItems((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleWorkItemClick = (workItemId) =>
    navigate(`/project/${projectId}/${workItemId}`);

  const handleBack = () => {
    if (window.history.length > 2) navigate(-1);
    else navigate("/", { replace: true });
  };

  if (!project) return <Container>Không tìm thấy dự án.</Container>;

  return (
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
            "&:hover": { bgcolor: "#f8f8f8" },
            mb: 3,
          }}
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
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
          {project.title}
        </Typography>
        <Divider sx={{ borderColor: "#1C5B41", borderWidth: "3px", mb: 4 }} />

        {/* MOBILE */}
        {isMobile ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {formattedWorkItems.map((item) => {
              const isExpanded = !!expandedItems[item.id];
              const tasks = getFormattedTaskData(item.id);

              return (
                <Paper
                  key={item.id}
                  elevation={0}
                  sx={{
                    border: "1px solid #E0E0E0",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    onClick={() => handleToggleExpand(item.id)}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      backgroundColor: "#1C5B41",
                      color: "white",
                      p: 1.5,
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      {item.hangMuc}
                    </Typography>
                    <IconButton size="small" sx={{ color: "white" }}>
                      {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>

                  {isExpanded ? (
                    <Box sx={{ backgroundColor: "#fff", p: 1 }}>
                      <DetailRow label="Số lượng" value={item.soLuong} />
                      <DetailRow
                        label="Khối lượng 1 Hạng mục"
                        value={item.khoiLuong1HM}
                      />
                      <DetailRow
                        label="Khối lượng tổng"
                        value={item.khoiLuongTong}
                      />
                      <DetailRow label="Đơn vị tính" value={item.donViTinh} />
                      <DetailRow label="Đơn giá" value={item.donGia} />
                      <DetailRow
                        label="Thành tiền"
                        value={item.thanhTien}
                        valueColor="#1C5B41"
                      />
                      <DetailRow label="Ghi chú" value={item.ghiChu || "---"} />

                      <ViewDetailRow
                        taskCount={tasks.length}
                        onClick={() => handleWorkItemClick(item.id)}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        backgroundColor: "#f0f5f3",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <ViewDetailButton
                        itemId={item.id}
                        onClick={handleWorkItemClick}
                      />

                      <Typography
                        sx={{
                          color: "#1C5B41",
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                        }}
                      >
                        {item.thanhTien}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              );
            })}
          </Box>
        ) : (
          /* DESKTOP */
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
                    align="right"
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    SỐ LƯỢNG
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    KHỐI LƯỢNG 1 HẠNG MỤC
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    KHỐI LƯỢNG TỔNG
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    ĐƠN VỊ TÍNH
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    ĐƠN GIÁ
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: "white", fontWeight: "bold" }}
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
                    onClick={() => handleWorkItemClick(item.id)}
                    sx={{
                      cursor: "pointer",
                      "&:nth-of-type(odd)": { backgroundColor: "#fcfcfc" },
                      "&:nth-of-type(even)": { backgroundColor: "#F7FAFC" },
                      "&:hover": { backgroundColor: "#f0f5f3" },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {item.hangMuc}
                    </TableCell>
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
        )}
      </Paper>
    </Container>
  );
}
