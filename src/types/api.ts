// Generic: dùng lại cho mọi loại dữ liệu API trả về
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
