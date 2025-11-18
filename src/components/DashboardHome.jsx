import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  // Grid, // <-- BỎ Grid
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon, Add as AddIcon } from "@mui/icons-material";

// Đảm bảo đường dẫn import của bạn là đúng
import ProjectCard from "../components/ProjectCard.jsx";
import Status from "../components/Status.jsx";
import { projectData } from "../data/projectData.js";

// === LOGIC 33% + 1% GAP CỦA BẠN ===
// Chúng ta sẽ dùng spacing={3} của MUI, tương đương 24px
// Box cha sẽ có margin âm 12px (nửa gap)
// Box con sẽ có padding 12px (nửa gap)
// 12px + 12px = 24px (đây là "1% gap" của bạn)
const gap = 3; // Tương đương 24px

export default function DashboardHome() {
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");

  // Giữ nguyên 2 khối useMemo
  const statusCounts = useMemo(() => {
    const counts = {
      "Tất cả": projectData.length,
      Nháp: 0,
      "Chờ duyệt": 0,
      "Đã duyệt": 0,
      "Từ chối": 0,
    };
    projectData.forEach((project) => {
      if (Object.prototype.hasOwnProperty.call(counts, project.status)) {
        counts[project.status]++;
      }
    });
    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedStatus === "Tất cả") return projectData;
    return projectData.filter((project) => project.status === selectedStatus);
  }, [selectedStatus]);

  return (
    // === BOX 96% CỦA BẠN ===
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: "#FFF",
        padding: { xs: 1.5, md: 3 },
        borderRadius: "12px",
        width: { xs: "100%", md: "96%" },
        margin: "0 auto",
        overflowX: "hidden",
        boxSizing: "border-box",
        minHeight: "100%",
      }}
    >
      {/* HEADER (Giữ nguyên) */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2D3748" }}>
          Danh sách dự án
        </Typography>
        <Button
          variant="contained"
          startIcon={
            <AddIcon
              sx={{
                backgroundColor: "#FFF",
                color: "#1C5B41",
                borderRadius: "50%",
                padding: "2px",
              }}
            />
          }
          sx={{
            backgroundColor: "#1C5B41",
            color: "#FFF",
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "8px 16px",
            "&:hover": { backgroundColor: "#154A32" },
          }}
        >
          Nhập dự án mới
        </Button>
      </Box>

      {/* TÌM KIẾM (Giữ nguyên) */}
      <Box sx={{ mb: 3, width: "100%", maxWidth: "500px" }}>
        <TextField
          placeholder="Tìm kiếm tên dự án..."
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            "& .MUiOutlinedInput-root": {
              borderRadius: "8px",
              backgroundColor: "#F8F9FA",
              fontSize: "0.9rem",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* STATUS FILTER (Giữ nguyên) */}
      <Status
        counts={statusCounts}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {/* === DANH SÁCH DỰ ÁN (LOGIC FLEXBOX THỦ CÔNG) === */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          mt: 3,
          // 1. Tạo margin âm để bù đắp cho padding của con
          margin: (theme) => theme.spacing(-gap / 2),
        }}
      >
        {filteredProjects.map((project) => (
          // 2. Đây là "cột" 33% của bạn
          <Box
            key={project.id}
            sx={{
              display: "flex", // Giúp card con cao 100%
              boxSizing: "border-box",

              // 3. Logic chia cột
              width: {
                md: "33.3333%", // 3 cột
                sm: "50%", // 2 cột
                xs: "100%", // 1 cột
              },

              // 4. Đây là "1% gap" của bạn (nửa gap ở mỗi bên)
              padding: (theme) => theme.spacing(gap / 2),
            }}
          >
            {/* ProjectCard (với width: 100%) sẽ
                tự động lấp đầy "cột" 33% này */}
            <ProjectCard {...project} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
