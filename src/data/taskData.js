// src/data/taskData.js

// Hàm format tiền tệ
const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  minimumFractionDigits: 0,
});

// Hàm format số
const formatNumber = (num) => {
  if (typeof num !== "number") return num;
  return num.toLocaleString("vi-VN");
};

// Data thô cho các công việc con (tasks)
// Data cho "KẾT CẤU THÉP NHÀ XƯỞNG" (workItemId: 1)
const tasks1 = [
  {
    id: "task-1",
    name: "Lắp dựng kết cấu thép",
    unit: "tấn",
    quantity: 45,
    materialPrice: 18500000,
    laborPrice: 3500000,
    note: "Thép Q235",
  },
  {
    id: "task-2",
    name: "Lắp tôn mái",
    unit: "m2",
    quantity: 1200,
    materialPrice: 95000,
    laborPrice: 30000,
    note: "Tôn 3 lớp",
  },
];

// Data cho "NỀN VÀ SÀN NHÀ XƯỞNG" (workItemId: 2)
const tasks2 = [
  {
    id: "task-3",
    name: "Đào đất nền",
    unit: "m3",
    quantity: 300,
    materialPrice: 0,
    laborPrice: 80000,
    note: "",
  },
  {
    id: "task-4",
    name: "Đổ bê tông sàn",
    unit: "m3",
    quantity: 450,
    materialPrice: 1400000,
    laborPrice: 350000,
    note: "Bê tông M250",
  },
];

const tasks3 = [
  {
    id: "task-5",
    name: "Lắp tủ điện tổng MSB",
    unit: "tủ",
    quantity: 2,
    materialPrice: 150000000,
    laborPrice: 15000000,
    note: "Tủ 1600A",
  },
  {
    id: "task-6",
    name: "Kéo cáp động lực",
    unit: "m",
    quantity: 2500,
    materialPrice: 85000,
    laborPrice: 25000,
    note: "Cáp CVV 4x50",
  },
];

const taskStore = {
  1: tasks1,
  2: tasks2,
  3: tasks3,
};

const workItemTitles = {
  1: "KẾT CẤU THÉP NHÀ XƯỞNG",
  2: "NỀN VÀ SÀN NHÀ XƯỞNG",
  3: "HỆ THỐNG ĐIỆN CÔNG NGHIỆP",
  4: "TƯỜNG & CỬA",
  5: "HỆ THỐNG PCCC",
  6: "HỆ THỐNG NƯỚC",
  7: "PHẦN MÓNG CỌC BÊ TÔNG",
  8: "KẾT CẤU TẦNG HẦM",
};

export const getWorkItemTitle = (workItemId) => {
  return workItemTitles[workItemId] || "Chi tiết Hạng mục";
};

export const getFormattedTaskData = (workItemId) => {
  const tasks = taskStore[workItemId];

  if (!tasks) {
    return [];
  }

  return tasks.map((task) => {
    const materialTotal = task.materialPrice * task.quantity;
    const laborTotal = task.laborPrice * task.quantity;
    const total = materialTotal + laborTotal;

    return {
      ...task,
      materialPriceFormatted: formatter.format(task.materialPrice),
      laborPriceFormatted: formatter.format(task.laborPrice),
      materialTotalFormatted: formatter.format(materialTotal),
      laborTotalFormatted: formatter.format(laborTotal),
      totalFormatted: formatter.format(total),
      // Format số
      quantityFormatted: formatNumber(task.quantity),
    };
  });
};
