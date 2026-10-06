import type { ApiResponse } from "../types/api";
import type { Deadline } from "../features/deadlines/deadlineTypes";
import { dateFromToday } from "../utils/date";

// Dữ liệu mẫu tính theo hôm nay nên luôn có: còn hạn / hôm nay / quá hạn / đã xong
const sampleDeadlines = (): Deadline[] => [
  { id: "1", subject: "Lập trình web nâng cao", title: "Bài thực hành 01 - Redux Toolkit", dueDate: dateFromToday(3), priority: "high", completed: false },
  { id: "2", subject: "Cơ sở dữ liệu", title: "Thiết kế ERD hệ thống thư viện", dueDate: dateFromToday(0), priority: "medium", completed: false },
  { id: "3", subject: "Giải tích 2", title: "Bài tập tích phân bội", dueDate: dateFromToday(-2), priority: "high", completed: false },
  { id: "4", subject: "Tiếng Anh chuyên ngành", title: "Viết báo cáo 500 từ", dueDate: dateFromToday(-5), priority: "low", completed: true },
  { id: "5", subject: "Mạng máy tính", title: "Lab cấu hình VLAN", dueDate: dateFromToday(10), priority: "low", completed: false },
  { id: "6", subject: "Cơ sở dữ liệu", title: "Bài tập truy vấn SQL", dueDate: dateFromToday(1), priority: "medium", completed: true },
];

// Generic: giả lập server trả về ApiResponse<T> sau một khoảng trễ
function mockRequest<T>(data: T, delayMs = 900): Promise<ApiResponse<T>> {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      // Thêm ?error=1 vào URL để thử trạng thái lỗi
      if (new URLSearchParams(window.location.search).has("error")) reject(new Error("Network error"));
      else resolve({ success: true, data });
    }, delayMs)
  );
}

export const deadlineApi = {
  getAll: (): Promise<ApiResponse<unknown[]>> => mockRequest<unknown[]>(sampleDeadlines()),
};
