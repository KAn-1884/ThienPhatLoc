import { Box, Typography, Grid } from "@mui/material";
import ProjectCard from "./ProjectCard.jsx";
import Status from "./Status.jsx";
import { projectData } from "../data/projectData.js";


export default function DashboardHome() {
  return (
    <Box sx={{ backgroundColor: "#FFF", padding: 3, borderRadius: "12px" }}>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "#2D3748",
        }}
      >
        Danh sách biểu mẫu chi phí
      </Typography>
      <Status />
      <Grid container spacing={5} justifyContent={"center"}>
        {projectData.map((project) => (
          <Grid item xs={12} md={6} lg={4} key={project.id}>
            <ProjectCard
              id={project.id}
              title={project.title}
              formId={project.formId}
              status={project.status}
              address={project.address}
              jobCount={project.jobCount}
              totalCost={project.totalCost}
              date={project.date}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
