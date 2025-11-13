const formatNumber = (num) => {
  if (typeof num !== "number") return num;
  return num.toLocaleString("vi-VN");
};

const workItems1 = [
  {
    id: 1,
    hangMuc: "KẾT CẤU THÉP NHÀ XƯỞNG",
    soLuong: 1,
    khoiLuong1HM: 1200,
    khoiLuongTong: 12000,
    donViTinh: "m2",
    donGia: 950000,
    thanhTien: 1140000000,
    ghiChu: "",
  },
  {
    id: 2,
    hangMuc: "NỀN VÀ SÀN NHÀ XƯỞNG",
    soLuong: 4,
    khoiLuong1HM: 500,
    khoiLuongTong: 3000,
    donViTinh: "m2",
    donGia: 580000,
    thanhTien: 696000000,
    ghiChu: "",
  },
  {
    id: 3,
    hangMuc: "HỆ THỐNG ĐIỆN CÔNG NGHIỆP",
    soLuong: 11,
    khoiLuong1HM: 600,
    khoiLuongTong: 1800,
    donViTinh: "m2",
    donGia: 420000,
    thanhTien: 504000000,
    ghiChu: "",
  },
  {
    id: 4,
    hangMuc: "TƯỜNG & CỬA",
    soLuong: 15,
    khoiLuong1HM: 450,
    khoiLuongTong: 1350,
    donViTinh: "m2",
    donGia: 380000,
    thanhTien: 171000000,
    ghiChu: "",
  },
  {
    id: 5,
    hangMuc: "HỆ THỐNG PCCC",
    soLuong: 71,
    khoiLuong1HM: 100,
    khoiLuongTong: 1500,
    donViTinh: "m2",
    donGia: 250000,
    thanhTien: 300000000,
    ghiChu: "",
  },
  {
    id: 6,
    hangMuc: "HỆ THỐNG NƯỚC",
    soLuong: 313,
    khoiLuong1HM: 1200,
    khoiLuongTong: 1200,
    donViTinh: "m2",
    donGia: 200000,
    thanhTien: 240000000,
    ghiChu: "",
  },
];

const workItems2 = [
  {
    id: 7,
    hangMuc: "PHẦN MÓNG CỌC BÊ TÔNG",
    soLuong: 200,
    khoiLuong1HM: 1,
    khoiLuongTong: 200,
    donViTinh: "cọc",
    donGia: 1500000,
    thanhTien: 300000000,
    ghiChu: "Cọc D300",
  },
  {
    id: 8,
    hangMuc: "KẾT CẤU TẦNG HẦM",
    soLuong: 1,
    khoiLuong1HM: 800,
    khoiLuongTong: 800,
    donViTinh: "m2",
    donGia: 2200000,
    thanhTien: 1760000000,
    ghiChu: "Bê tông M300",
  },
  {
    id: 9,
    hangMuc: "HỆ THỐNG THANG MÁY",
    soLuong: 2,
    khoiLuong1HM: 1,
    khoiLuongTong: 2,
    donViTinh: "hệ",
    donGia: 450000000,
    thanhTien: 900000000,
    ghiChu: "Thang 750kg",
  },
];

const workItems3 = [
  {
    id: 10,
    hangMuc: "VÁCH KÍNH MẶT DỰNG (CURTAIN WALL)",
    soLuong: 1,
    khoiLuong1HM: 1500,
    khoiLuongTong: 1500,
    donViTinh: "m2",
    donGia: 3500000,
    thanhTien: 5250000000,
    ghiChu: "Kính Low-E",
  },
  {
    id: 11,
    hangMuc: "HOÀN THIỆN SẢNH CAO CẤP",
    soLuong: 1,
    khoiLuong1HM: 300,
    khoiLuongTong: 300,
    donViTinh: "m2",
    donGia: 8000000,
    thanhTien: 2400000000,
    ghiChu: "Đá Marble Ý",
  },
];

const workItems4 = [
  {
    id: 12,
    hangMuc: "XÂY TÔ HÀNG RÀO & CỔNG CHÍNH",
    soLuong: 1,
    khoiLuong1HM: 450,
    khoiLuongTong: 450,
    donViTinh: "m2",
    donGia: 700000,
    thanhTien: 315000000,
    ghiChu: "",
  },
  {
    id: 13,
    hangMuc: "LÁT ĐÁ VỈA HÈ & ĐƯỜNG NỘI BỘ",
    soLuong: 1,
    khoiLuong1HM: 2500,
    khoiLuongTong: 2500,
    donViTinh: "m2",
    donGia: 450000,
    thanhTien: 1125000000,
    ghiChu: "Đá Granite",
  },
  {
    id: 14,
    hangMuc: "HỆ THỐNG CHIẾU SÁNG CÔNG CỘNG",
    soLuong: 80,
    khoiLuong1HM: 1,
    khoiLuongTong: 80,
    donViTinh: "trụ",
    donGia: 3000000,
    thanhTien: 240000000,
    ghiChu: "Đèn LED",
  },
];

const workItems5 = [
  {
    id: 15,
    hangMuc: "ÉP CỌC LY TÂM D600",
    soLuong: 150,
    khoiLuong1HM: 30,
    khoiLuongTong: 4500,
    donViTinh: "m",
    donGia: 400000,
    thanhTien: 1800000000,
    ghiChu: "",
  },
  {
    id: 16,
    hangMuc: "KẾT CẤU BỂ NGẦM",
    soLuong: 1,
    khoiLuong1HM: 1,
    khoiLuongTong: 1,
    donViTinh: "hệ",
    donGia: 600000000,
    thanhTien: 600000000,
    ghiChu: "Bể 500 m3",
  },
];

const workItems6 = [
  {
    id: 17,
    hangMuc: "ĐH KHÔNG KHÍ TRUNG TÂM (CHILLER)",
    soLuong: 2,
    khoiLuong1HM: 1,
    khoiLuongTong: 2,
    donViTinh: "hệ",
    donGia: 3000000000,
    thanhTien: 6000000000,
    ghiChu: "Hãng Trane",
  },
  {
    id: 18,
    hangMuc: "LẮP ĐẶT THANG CUỐN",
    soLuong: 8,
    khoiLuong1HM: 1,
    khoiLuongTong: 8,
    donViTinh: "cái",
    donGia: 900000000,
    thanhTien: 7200000000,
    ghiChu: "",
  },
  {
    id: 19,
    hangMuc: "SƠN EPOXY TẦNG HẦM",
    soLuong: 1,
    khoiLuong1HM: 10000,
    khoiLuongTong: 10000,
    donViTinh: "m2",
    donGia: 250000,
    thanhTien: 2500000000,
    ghiChu: "Sơn KCC",
  },
];

const workItems7 = [
  {
    id: 20,
    hangMuc: "KHẢO SÁT HIỆN TRẠNG",
    soLuong: 1,
    khoiLuong1HM: 1,
    khoiLuongTong: 1,
    donViTinh: "lần",
    donGia: 5000000,
    thanhTien: 5000000,
    ghiChu: "Đang chờ duyệt",
  },
  {
    id: 21,
    hangMuc: "LẬP BÁO GIÁ SƠ BỘ",
    soLuong: 1,
    khoiLuong1HM: 1,
    khoiLuongTong: 1,
    donViTinh: "bộ",
    donGia: 10000000,
    thanhTien: 10000000,
    ghiChu: "Đã gửi",
  },
];

const workItems8 = [
  {
    id: 22,
    hangMuc: "THIẾT KẾ Ý TƯỞNG (CONCEPT)",
    soLuong: 1,
    khoiLuong1HM: 1,
    khoiLuongTong: 1,
    donViTinh: "gói",
    donGia: 50000000,
    thanhTien: 50000000,
    ghiChu: "Chờ thông tin",
  },
  {
    id: 23,
    hangMuc: "THIẾT KẾ KỸ THUẬT (TECHNICAL)",
    soLuong: 1,
    khoiLuong1HM: 1,
    khoiLuongTong: 1,
    donViTinh: "gói",
    donGia: 100000000,
    thanhTien: 100000000,
    ghiChu: "Chờ thông tin",
  },
];

const workItemStore = {
  1: workItems1,
  2: workItems2,
  3: workItems3,
  4: workItems4,
  5: workItems5,
  6: workItems6,
  7: workItems7,
  8: workItems8,
};

export const getFormattedWorkItems = (projectId) => {
  const projectWorkItems = workItemStore[projectId];

  if (!projectWorkItems) {
    console.error(`Không tìm thấy workItems cho projectId: ${projectId}`);
    return [];
  }

  return projectWorkItems.map((item) => ({
    ...item,
    soLuong: formatNumber(item.soLuong),
    khoiLuong1HM: formatNumber(item.khoiLuong1HM),
    khoiLuongTong: formatNumber(item.khoiLuongTong),
    donGia: formatNumber(item.donGia),
    thanhTien: formatNumber(item.thanhTien),
  }));
};
