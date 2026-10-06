import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { isOverdue } from "../../../utils/date";
import { setFilter } from "../deadlineSlice";
import type { Deadline, FilterType } from "../deadlineTypes";

const matchers: Record<FilterType, (d: Deadline) => boolean> = {
  all: () => true,
  pending: (d) => !d.completed,
  completed: (d) => d.completed,
  overdue: (d) => !d.completed && isOverdue(d.dueDate),
};

// Gom logic lọc + thống kê; component chỉ việc hiển thị
export function useDeadlineFilter() {
  const dispatch = useAppDispatch();
  const { items, filter } = useAppSelector((s) => s.deadlines);

  const filtered = useMemo(() => items.filter(matchers[filter]), [items, filter]);
  const stats = useMemo(
    () => ({
      total: items.length,
      pending: items.filter(matchers.pending).length,
      overdue: items.filter(matchers.overdue).length,
      completed: items.filter(matchers.completed).length,
    }),
    [items]
  );

  return { filtered, filter, stats, changeFilter: (f: FilterType) => dispatch(setFilter(f)) };
}
