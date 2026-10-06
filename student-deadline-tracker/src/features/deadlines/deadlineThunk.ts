import { createAsyncThunk } from "@reduxjs/toolkit";
import { deadlineApi } from "../../services/deadlineApi";
import { isDeadline, type Deadline } from "./deadlineTypes";

// pending -> fulfilled / rejected được xử lý trong deadlineSlice (extraReducers)
export const fetchDeadlines = createAsyncThunk<Deadline[], void, { rejectValue: string }>(
  "deadlines/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await deadlineApi.getAll();
      return res.data.filter(isDeadline); // type guard loại dữ liệu sai định dạng
    } catch {
      return rejectWithValue("Không thể tải dữ liệu. Vui lòng thử lại.");
    }
  }
);
