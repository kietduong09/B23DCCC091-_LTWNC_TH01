import { useAppDispatch } from "../../../app/hooks";
import { useDeadlineForm } from "../hooks/useDeadlineForm";
import { addDeadline } from "../deadlineSlice";
import { PRIORITY_LABELS, type Priority } from "../deadlineTypes";

export default function DeadlineForm() {
  const dispatch = useAppDispatch();
  const { values, errors, handleChange, handleSubmit } = useDeadlineForm((input) => dispatch(addDeadline(input)));

  return (
    <form className="panel form" onSubmit={handleSubmit} noValidate>
      <h2>Thêm bài tập mới</h2>
      <label>Môn học
        <input name="subject" value={values.subject} onChange={handleChange} placeholder="VD: Cơ sở dữ liệu" />
        {errors.subject && <small className="error">{errors.subject}</small>}
      </label>
      <label>Tên bài tập
        <input name="title" value={values.title} onChange={handleChange} placeholder="VD: Bài tập chương 3" />
        {errors.title && <small className="error">{errors.title}</small>}
      </label>
      <label>Hạn nộp
        <input type="date" name="dueDate" value={values.dueDate} onChange={handleChange} />
        {errors.dueDate && <small className="error">{errors.dueDate}</small>}
      </label>
      <label>Độ ưu tiên
        <select name="priority" value={values.priority} onChange={handleChange}>
          <option value="">-- Chọn độ ưu tiên --</option>
          {(Object.keys(PRIORITY_LABELS) as Priority[]).map((p) => (
            <option key={p} value={p}>{PRIORITY_LABELS[p]}</option>
          ))}
        </select>
        {errors.priority && <small className="error">{errors.priority}</small>}
      </label>
      <button className="btn btn-primary" type="submit">+ Thêm deadline</button>
    </form>
  );
}
