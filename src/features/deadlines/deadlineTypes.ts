export type Priority = "low" | "medium" | "high";

export interface Deadline {
  id: string;
  subject: string;
  title: string;
  dueDate: string; // "YYYY-MM-DD"
  priority: Priority;
  completed: boolean;
}

// Utility Types
export type CreateDeadlineInput = Omit<Deadline, "id" | "completed">;
export type DeadlineFormErrors = Partial<Record<keyof CreateDeadlineInput, string>>;
export type DeadlineFormValues = Omit<CreateDeadlineInput, "priority"> & { priority: Priority | "" };

export type FilterType = "all" | "pending" | "overdue" | "completed";
export const FILTER_LABELS: Record<FilterType, string> = {
  all: "Tất cả", pending: "Chưa hoàn thành", overdue: "Quá hạn", completed: "Đã hoàn thành",
};
export const PRIORITY_LABELS: Record<Priority, string> = { low: "Thấp", medium: "Trung bình", high: "Cao" };

// Type Guard: kiểm tra dữ liệu "unknown" từ API trước khi đưa vào store
export function isDeadline(value: unknown): value is Deadline {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" && typeof v.subject === "string" && typeof v.title === "string" &&
    typeof v.dueDate === "string" && typeof v.completed === "boolean" &&
    (v.priority === "low" || v.priority === "medium" || v.priority === "high")
  );
}
