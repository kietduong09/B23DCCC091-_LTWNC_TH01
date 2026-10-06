import DeadlineCard from "./DeadlineCard";
import type { Deadline } from "../deadlineTypes";

export default function DeadlineList({ items }: { items: Deadline[] }) {
  if (items.length === 0) return <div className="state">Chưa có deadline nào.</div>;
  return (
    <ul className="list">
      {items.map((d) => (
        <DeadlineCard key={d.id} deadline={d}>
          <DeadlineCard.Subject />
          <DeadlineCard.Title />
          <DeadlineCard.Meta />
          <DeadlineCard.Actions />
        </DeadlineCard>
      ))}
    </ul>
  );
}
