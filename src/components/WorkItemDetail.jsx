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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { getFormattedTaskData, getWorkItemTitle } from "../data/taskData";

const green = "#1C5B41";

const headerCell = {
  color: "white",
  fontWeight: "bold",
  borderBottom: "none",
};

const DetailRow = ({ label, value, isGreenBoldValue }) => (
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
      sx={{
        color: green,
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "0.8rem",
      }}
    >
      {label}
    </Typography>

    <Typography
      variant="body1"
      sx={{
        fontWeight: isGreenBoldValue ? "bold" : 500,
        color: isGreenBoldValue ? green : "text.primary",
      }}
    >
      {value}
    </Typography>
  </Box>
);

export default function WorkItemDetail() {
  const { workItemId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const tasks = getFormattedTaskData(workItemId);
  const workItemTitle = getWorkItemTitle(workItemId);

  const [expandedTasks, setExpandedTasks] = useState({});
  const toggleExpand = (id) =>
    setExpandedTasks((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: { xs: "16px", md: "12px" },
          boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
          bgcolor: "#fff",
        }}
      >
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: "12px",
            bgcolor: "#FFF",
            color: "#4A5568",
            border: "1px solid #E0E0E0",
            "&:hover": { bgcolor: "#f8f8f8" },
            mb: 3,
          }}
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Quay lại
        </Button>

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: green,
            textAlign: "center",
            mb: 1,
            textTransform: "uppercase",
            fontSize: { xs: "1.25rem", md: "1.5rem" },
          }}
        >
          {workItemTitle}
        </Typography>

        <Divider sx={{ borderColor: green, borderWidth: "3px", mb: 4 }} />

        {isMobile ? (
          <Box display="flex" flexDirection="column" gap={1.5}>
            {tasks.map((task) => {
              const isOpen = expandedTasks[task.id];
              return (
                <Paper
                  key={task.id}
                  elevation={0}
                  sx={{
                    border: `1px solid ${green}`,
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    onClick={() => toggleExpand(task.id)}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      backgroundColor: green,
                      color: "white",
                      p: 1.5,
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      {task.name}
                    </Typography>

                    <IconButton size="small" sx={{ color: "white" }}>
                      {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Box>

                  {isOpen ? (
                    <Box sx={{ backgroundColor: "#fff" }}>
                      <DetailRow label="Đơn vị" value={task.unit} />
                      <DetailRow
                        label="Khối lượng"
                        value={task.quantityFormatted}
                      />
                      <DetailRow
                        label="ĐG Vật liệu"
                        value={task.materialPriceFormatted}
                      />
                      <DetailRow
                        label="ĐG Nhân công"
                        value={task.laborPriceFormatted}
                      />
                      <DetailRow
                        label="TT Vật liệu"
                        value={task.materialTotalFormatted}
                        isGreenBoldValue
                      />
                      <DetailRow
                        label="TT Nhân công"
                        value={task.laborTotalFormatted}
                        isGreenBoldValue
                      />
                      <DetailRow
                        label="Tổng tiền"
                        value={task.totalFormatted}
                        isGreenBoldValue
                      />
                      <DetailRow label="Ghi chú" value={task.note || "---"} />
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
                      <Typography sx={{ color: "text.secondary" }}>
                        Tổng tiền:
                      </Typography>
                      <Typography
                        sx={{
                          color: green,
                          fontWeight: "bold",
                          fontSize: "1.1rem",
                        }}
                      >
                        {task.totalFormatted}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              );
            })}
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ borderRadius: "8px" }}
          >
            <Table sx={{ minWidth: 1000 }} size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: green }}>
                  <TableCell rowSpan={2} sx={headerCell}>
                    STT
                  </TableCell>
                  <TableCell rowSpan={2} sx={headerCell}>
                    TÊN CÔNG VIỆC
                  </TableCell>
                  <TableCell rowSpan={2} sx={headerCell}>
                    ĐƠN VỊ
                  </TableCell>
                  <TableCell rowSpan={2} sx={headerCell} align="right">
                    KHỐI LƯỢNG
                  </TableCell>

                  <TableCell
                    colSpan={2}
                    sx={{
                      ...headerCell,
                      textAlign: "center",
                      borderBottom: "1px solid #4a7c66",
                    }}
                  >
                    ĐƠN GIÁ
                  </TableCell>

                  <TableCell
                    colSpan={2}
                    sx={{
                      ...headerCell,
                      textAlign: "center",
                      borderBottom: "1px solid #4a7c66",
                    }}
                  >
                    THÀNH TIỀN
                  </TableCell>

                  <TableCell rowSpan={2} sx={headerCell}>
                    GHI CHÚ
                  </TableCell>
                </TableRow>

                <TableRow sx={{ backgroundColor: green }}>
                  <TableCell sx={headerCell} align="right">
                    VẬT LIỆU
                  </TableCell>
                  <TableCell sx={headerCell} align="right">
                    NHÂN CÔNG
                  </TableCell>
                  <TableCell sx={headerCell} align="right">
                    VẬT LIỆU
                  </TableCell>
                  <TableCell sx={headerCell} align="right">
                    NHÂN CÔNG
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {tasks.map((task, i) => (
                  <TableRow
                    key={task.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#fcfcfc" },
                      "&:nth-of-type(even)": { backgroundColor: "#F7FAFC" },
                    }}
                  >
                    <TableCell>{i + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{task.name}</TableCell>
                    <TableCell>{task.unit}</TableCell>

                    <TableCell align="right">
                      {task.quantityFormatted}
                    </TableCell>
                    <TableCell align="right">
                      {task.materialPriceFormatted}
                    </TableCell>
                    <TableCell align="right">
                      {task.laborPriceFormatted}
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{ fontWeight: "bold", color: green }}
                    >
                      {task.materialTotalFormatted}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: "bold", color: green }}
                    >
                      {task.laborTotalFormatted}
                    </TableCell>

                    <TableCell>{task.note}</TableCell>
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
