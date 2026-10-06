const MS_PER_DAY = 86_400_000;

// Đổi ngày -> số ngày (UTC) để so sánh theo NGÀY, tránh lệch timezone
const toDayNumber = (y: number, m: number, d: number) => Date.UTC(y, m - 1, d) / MS_PER_DAY;

export function getDaysLeft(dueDate: string, now: Date = new Date()): number {
  const [y, m, d] = dueDate.split("-").map(Number);
  return toDayNumber(y, m, d) - toDayNumber(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

export const isOverdue = (dueDate: string) => getDaysLeft(dueDate) < 0;

export function formatDaysLeft(dueDate: string): string {
  const days = getDaysLeft(dueDate);
  if (days === 0) return "Hạn hôm nay";
  if (days === 1) return "Còn 1 ngày (ngày mai)";
  return days > 0 ? `Còn ${days} ngày` : `Quá hạn ${-days} ngày`;
}

export function formatDate(dueDate: string): string {
  const [y, m, d] = dueDate.split("-");
  return `${d}/${m}/${y}`;
}

export function dateFromToday(offset: number): string {
  const t = new Date();
  const d = new Date(t.getFullYear(), t.getMonth(), t.getDate() + offset);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
