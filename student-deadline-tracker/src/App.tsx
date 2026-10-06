import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchDeadlines } from "./features/deadlines/deadlineThunk";
import { useDeadlineFilter } from "./features/deadlines/hooks/useDeadlineFilter";
import DeadlineForm from "./features/deadlines/components/DeadlineForm";
import DeadlineList from "./features/deadlines/components/DeadlineList";
import DeadlineStats from "./features/deadlines/components/DeadlineStats";
import FilterBar from "./features/deadlines/components/FilterBar";

export default function App() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((s) => s.deadlines);
  const { filtered, filter, stats, changeFilter } = useDeadlineFilter();

  useEffect(() => { dispatch(fetchDeadlines()); }, [dispatch]);

  return (
    <>
      <header className="header">
        <div className="container">
          <h1>📚 Student Deadline Tracker</h1>
          <p>Quản lý deadline bài tập, không bao giờ nộp trễ</p>
        </div>
      </header>
      <main className="container">
        <DeadlineStats stats={stats} />
        <div className="layout">
          <DeadlineForm />
          <section>
            <FilterBar active={filter} onChange={changeFilter} />
            {status === "loading" || status === "idle" ? (
              <div className="state"><div className="spinner" />Đang tải danh sách bài tập...</div>
            ) : status === "failed" ? (
              <div className="state state-error">
                {error ?? "Không thể tải dữ liệu. Vui lòng thử lại."}
                <button className="btn btn-primary" onClick={() => dispatch(fetchDeadlines())}>Thử lại</button>
              </div>
            ) : (
              <DeadlineList items={filtered} />
            )}
          </section>
        </div>
      </main>
    </>
  );
}
