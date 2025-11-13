//
// File: src/components/DashboardHome.jsx
//
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon, Add as AddIcon } from "@mui/icons-material";
import { useState, useMemo } from "react";

// Import các component và data
import ProjectCard from "./ProjectCard.jsx";
import Status from "./Status.jsx"; // Đảm bảo file Status.jsx của bạn đã đúng
import { projectData } from "../data/projectData.js";

export default function DashboardHome() {
  // === LOGIC STATE VÀ LỌC (Giữ nguyên, đã đúng) ===
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");

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
  }, [projectData]);

  const filteredProjects = useMemo(() => {
    if (selectedStatus === "Tất cả") {
      return projectData;
    }
    return projectData.filter((project) => project.status === selectedStatus);
  }, [selectedStatus, projectData]);

  // === PHẦN RENDER ===
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: "#FFF",
        padding: { xs: 1.5, md: 3 },
        borderRadius: "12px",
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* === PHẦN HEADER (Đã đúng) === */}
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
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#2D3748",
          }}
        >
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
            "&:hover": {
              backgroundColor: "#154A32",
            },
          }}
        >
          Nhập dự án mới
        </Button>
      </Box>

      {/* === PHẦN TÌM KIẾM (Đã đúng) === */}
      <Box sx={{ mb: 3, width: "100%", maxWidth: "500px" }}>
        <TextField
          placeholder="Tìm kiếm tên dự án..."
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
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

      {/* === PHẦN STATUS (Đã đúng) === */}
      <Status
        counts={statusCounts}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      <Grid
        container
        spacing={3}
        sx={{
          width: "100%",
          m: 0,
        }}
      >
        {filteredProjects.map((project) => (
          <Grid item key={project.id} xs={12} sm={6} md={4}>
            <ProjectCard {...project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
