import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon, Add as AddIcon } from "@mui/icons-material";
import ProjectCard from "./ProjectCard.jsx";
import Status from "./Status.jsx";
import { projectData } from "../data/projectData.js";

export default function DashboardHome() {
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
      {/* === PHẦN HEADER (TIÊU ĐỀ VÀ NÚT) === */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2, // Giảm margin bottom
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
            // === ICON ĐƯỢC CẬP NHẬT ===
            <AddIcon
              sx={{
                backgroundColor: "#FFF", // Nền trắng
                color: "#1C5B41", // Màu icon xanh lá
                borderRadius: "50%", // Bo tròn
                padding: "2px", // Thêm chút đệm
              }}
            />
          }
          sx={{
            backgroundColor: "#1C5B41", // Màu nền nút
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

      {/* === PHẦN TÌM KIẾM (ĐÃ DI CHUYỂN XUỐNG DƯỚI) === */}
      <Box sx={{ mb: 3, width: "100%" }}>
        <TextField
          placeholder="Tìm kiếm tên dự án..."
          variant="outlined"
          size="small"
          fullWidth // Cho ô search chiếm toàn bộ chiều rộng
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
      {/* === KẾT THÚC THAY ĐỔI === */}

      <Status />

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="stretch"
        sx={{
          width: "100%",
          margin: 0,
        }}
      >
        {projectData.map((project) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={project.id}
            sx={{
              minWidth: 300,
              minHeight: 310,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ProjectCard {...project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
