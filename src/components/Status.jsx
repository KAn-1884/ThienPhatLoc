import { Stack, Chip, Avatar } from "@mui/material";
import { useState } from "react";
import initialStatuses from "../data/initialStatuses";

const baseChipStyle = {
  fontWeight: "bold",
  "& .MuiChip-avatar": {
    width: 24,
    height: 24,
    fontSize: "0.875rem",
    fontWeight: "bold",
    backgroundColor: "#E0E0E0",
    color: "#333",
  },
};

const activeChip = {
  ...baseChipStyle,
  backgroundColor: "#2D5F3F",
  color: "white",
  "&:hover": { backgroundColor: "#1C4A32" },
};

const inactiveChip = {
  ...baseChipStyle,
  backgroundColor: "#F0F5F2",
  color: "#2D5F3F",
  borderColor: "#2D5F3F",
  "&:hover": { backgroundColor: "#DDF0E8" },
};

function Status() {
  const [selectedId, setSelectedId] = useState("all");
  return (
    <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
      {initialStatuses.map((status) => {
        const isActive = status.id === selectedId;

        return (
          <Chip
            key={status.id}
            label={status.label}
            avatar={<Avatar>{status.count}</Avatar>}
            clickable
            onClick={() => setSelectedId(status.id)}
            variant={isActive ? "filled" : "outlined"}
            sx={isActive ? activeChip : inactiveChip}
          />
        );
      })}
    </Stack>
  );
}

export default Status;
