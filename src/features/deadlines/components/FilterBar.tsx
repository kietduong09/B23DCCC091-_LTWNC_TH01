import { FILTER_LABELS, type FilterType } from "../deadlineTypes";

interface Props { active: FilterType; onChange: (f: FilterType) => void }

export default function FilterBar({ active, onChange }: Props) {
  return (
    <div className="filters">
      {(Object.keys(FILTER_LABELS) as FilterType[]).map((f) => (
        <button key={f} className={`chip${f === active ? " active" : ""}`} onClick={() => onChange(f)}>
          {FILTER_LABELS[f]}
        </button>
      ))}
    </div>
  );
}
