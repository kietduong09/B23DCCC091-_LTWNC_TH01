interface Props { stats: { total: number; pending: number; overdue: number; completed: number } }

export default function DeadlineStats({ stats }: Props) {
  const cards = [
    { label: "Tổng số bài tập", value: stats.total, cls: "" },
    { label: "Chưa hoàn thành", value: stats.pending, cls: "warn" },
    { label: "Quá hạn", value: stats.overdue, cls: "danger" },
    { label: "Đã hoàn thành", value: stats.completed, cls: "ok" },
  ];
  return (
    <section className="stats">
      {cards.map((c) => (
        <div key={c.label} className={`stat ${c.cls}`}>
          <strong>{c.value}</strong><span>{c.label}</span>
        </div>
      ))}
    </section>
  );
}
