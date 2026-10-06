import { useState, type ChangeEvent, type FormEvent } from "react";
import type { CreateDeadlineInput, DeadlineFormErrors, DeadlineFormValues } from "../deadlineTypes";

const emptyForm: DeadlineFormValues = { subject: "", title: "", dueDate: "", priority: "" };

function validate(v: DeadlineFormValues): DeadlineFormErrors {
  const errors: DeadlineFormErrors = {};
  if (!v.subject.trim()) errors.subject = "Vui lòng nhập môn học.";
  if (!v.title.trim()) errors.title = "Vui lòng nhập tên bài tập.";
  if (!v.dueDate) errors.dueDate = "Vui lòng chọn hạn nộp.";
  if (!v.priority) errors.priority = "Vui lòng chọn độ ưu tiên.";
  return errors;
}

export function useDeadlineForm(onValidSubmit: (input: CreateDeadlineInput) => void) {
  const [values, setValues] = useState<DeadlineFormValues>(emptyForm);
  const [errors, setErrors] = useState<DeadlineFormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0 || values.priority === "") return;
    onValidSubmit({ ...values, subject: values.subject.trim(), title: values.title.trim(), priority: values.priority });
    setValues(emptyForm); // reset form
  };

  return { values, errors, handleChange, handleSubmit };
}
