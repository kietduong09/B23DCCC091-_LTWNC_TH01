import { createContext, useContext, type ReactNode } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { formatDate, formatDaysLeft, isOverdue } from "../../../utils/date";
import { removeDeadline, toggleDeadline } from "../deadlineSlice";
import { PRIORITY_LABELS, type Deadline } from "../deadlineTypes";

// Compound Component: các phần con dùng chung dữ liệu qua Context
const CardContext = createContext<Deadline | null>(null);

function useCard(): Deadline {
  const d = useContext(CardContext);
  if (!d) throw new Error("DeadlineCard.* phải nằm trong <DeadlineCard>");
  return d;
}

function DeadlineCard({ deadline, children }: { deadline: Deadline; children: ReactNode }) {
  const overdue = !deadline.completed && isOverdue(deadline.dueDate);
  const cls = `card priority-${deadline.priority}${deadline.completed ? " is-completed" : ""}${overdue ? " is-overdue" : ""}`;
  return (
    <CardContext.Provider value={deadline}>
      <li className={cls}>{children}</li>
    </CardContext.Provider>
  );
}

DeadlineCard.Subject = function Subject() {
  const d = useCard();
  return (
    <div className="card-top">
      <span className="subject">{d.subject}</span>
      <span className={`badge badge-${d.priority}`}>{PRIORITY_LABELS[d.priority]}</span>
    </div>
  );
};

DeadlineCard.Title = function Title() {
  return <h3 className="card-title">{useCard().title}</h3>;
};

DeadlineCard.Meta = function Meta() {
  const d = useCard();
  const overdue = !d.completed && isOverdue(d.dueDate);
  return (
    <div className="meta">
      <span>Hạn nộp: {formatDate(d.dueDate)}</span>
      <span className={`countdown${overdue ? " danger" : ""}`}>
        {d.completed ? "Đã hoàn thành" : formatDaysLeft(d.dueDate)}
      </span>
    </div>
  );
};

DeadlineCard.Actions = function Actions() {
  const d = useCard();
  const dispatch = useAppDispatch();
  return (
    <div className="actions">
      <button className="btn btn-ghost" onClick={() => dispatch(toggleDeadline(d.id))}>
        {d.completed ? "↩ Bỏ hoàn thành" : "✓ Hoàn thành"}
      </button>
      <button className="btn btn-danger" onClick={() => dispatch(removeDeadline(d.id))}>Xóa</button>
    </div>
  );
};

export default DeadlineCard;
