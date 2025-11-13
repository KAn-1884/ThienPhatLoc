// File: src/data/approvalMockData.js

// Hàm định dạng tiền tệ
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Dữ liệu giả lập cho trang Danh sách chờ duyệt
export const projectsToApprove = [
  // <-- NAMED EXPORT
  {
    id: "FORM-1760597435154",
    name: "Dự án Lake City",
    status: "Chờ duyệt",
    address:
      "Số 123/45, Đường Lê Thị Hồng Gấm, Khu phố 4, Phường Phú Hòa, Thành phố Thủ Dầu Một, Tỉnh Bình Dương",
    totalItems: 3,
    totalCost: 269000000,
    formattedCost: formatCurrency(269000000),
    createdDate: "2025-10-20",
  },
  {
    id: "FORM-1760597435155",
    name: "Dự án Smile City",
    status: "Chờ duyệt",
    address:
      "Số 123, Đường Lê Thị Hồng Gấm, Khu phố 4, Phường Phú Hòa, TP Thủ Dầu Một, Bình Dương",
    totalItems: 4,
    totalCost: 259000000,
    formattedCost: formatCurrency(259000000),
    createdDate: "2025-10-22",
  },
  {
    id: "FORM-1760597435156",
    name: "Dự án Sài Gòn Tower",
    status: "Chờ duyệt",
    address: "Quận 1, TP Hồ Chí Minh",
    totalItems: 5,
    totalCost: 1500000000,
    formattedCost: formatCurrency(1500000000),
    createdDate: "2025-10-25",
  },
];

// Hàm giả lập lấy dữ liệu chi tiết cho Component ProjectApproval
export const getApprovalData = (projectId) => {
  // <-- NAMED EXPORT
  // Tìm dự án trong danh sách
  const project = projectsToApprove.find((p) => p.id === projectId);

  if (!project) return null;

  // Dữ liệu chi tiết cho Component ProjectApproval
  return {
    formData: {
      project: project.name,
      batch: 1,
      address: project.address,
      dateFrom: "2025-10-01",
      dateTo: "2025-10-31",
      creator: "Nguyễn Văn A - Phòng Kỹ thuật",
    },
    workItems: [
      {
        id: 1,
        name: "Chi phí vật tư xây dựng cơ bản",
        cost: 150000000,
        note: "Theo hóa đơn 123",
      },
      {
        id: 2,
        name: "Chi phí nhân công thợ",
        cost: 80000000,
        note: "Thanh toán đợt 1",
      },
      {
        id: 3,
        name: "Chi phí di chuyển/lưu trú",
        cost: 39000000,
        note: "Vé tàu xe, khách sạn",
      },
    ],
    totalCost: project.totalCost,
    approvalState: {
      // Giả lập trạng thái ký duyệt
      chief: project.name === "Dự án Lake City" ? "Đã ký" : null,
      accountant: null,
      director: null,
    },
  };
};
