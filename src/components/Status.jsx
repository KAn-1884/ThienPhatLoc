import { Stack, Chip, Avatar } from "@mui/material";

// === CSS STYLES (Giữ nguyên 2 màu gốc của bạn) ===
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
  // Thêm style cho avatar khi active để đẹp hơn
  "& .MuiChip-avatar": {
    backgroundColor: "#FFF",
    color: "#2D5F3F",
  },
};

const inactiveChip = {
  ...baseChipStyle,
  backgroundColor: "#F0F5F2",
  color: "#2D5F3F",
  borderColor: "#2D5F3F",
  "&:hover": { backgroundColor: "#DDF0E8" },
};
// === KẾT THÚC CSS STYLES ===

// === DANH SÁCH TABS (Giữ nguyên) ===
const STATUS_TABS = [
  { id: "Tất cả", label: "Tất cả" },
  { id: "Nháp", label: "Nháp" },
  { id: "Chờ duyệt", label: "Chờ duyệt" },
  { id: "Đã duyệt", label: "Đã duyệt" },
  { id: "Từ chối", label: "Từ chối" },
];

// === COMPONENT (Đã cập nhật Stack sx) ===
function Status({ counts, selectedStatus, onStatusChange }) {
  if (!counts) return null;

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        mb: 3,
        flexWrap: "wrap", // 👈 CHO PHÉP XUỐNG HÀNG
        gap: 1, // Thêm 'gap' để các hàng xuống cách đều nhau
      }}
    >
      {STATUS_TABS.map((status) => {
        const isActive = status.id === selectedStatus;
        const count = counts[status.id] || 0;

        return (
          <Chip
            key={status.id}
            label={status.label}
            avatar={<Avatar>{count}</Avatar>}
            clickable
            onClick={() => onStatusChange(status.id)}
            variant={isActive ? "filled" : "outlined"}
            // 👈 SỬ DỤNG LOGIC 2 MÀU GỐC
            sx={isActive ? activeChip : inactiveChip}
          />
        );
      })}
    </Stack>
  );
}

export default Status;
