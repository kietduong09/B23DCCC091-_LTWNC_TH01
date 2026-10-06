import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import type { CreateDeadlineInput, Deadline, FilterType } from "./deadlineTypes";
import { fetchDeadlines } from "./deadlineThunk";

interface DeadlineState {
  items: Deadline[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filter: FilterType;
}

const initialState: DeadlineState = { items: [], status: "idle", error: null, filter: "all" };

const deadlineSlice = createSlice({
  name: "deadlines",
  initialState,
  reducers: {
    addDeadline: {
      reducer: (state, action: PayloadAction<Deadline>) => { state.items.unshift(action.payload); },
      prepare: (input: CreateDeadlineInput) => ({ payload: { ...input, id: nanoid(), completed: false } }),
    },
    toggleDeadline: (state, action: PayloadAction<string>) => {
      const item = state.items.find((d) => d.id === action.payload);
      if (item) item.completed = !item.completed;
    },
    removeDeadline: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((d) => d.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<FilterType>) => { state.filter = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeadlines.pending, (state) => { state.status = "loading"; state.error = null; })
      .addCase(fetchDeadlines.fulfilled, (state, action) => { state.status = "succeeded"; state.items = action.payload; })
      .addCase(fetchDeadlines.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Không thể tải dữ liệu. Vui lòng thử lại.";
      });
  },
});

export const { addDeadline, toggleDeadline, removeDeadline, setFilter } = deadlineSlice.actions;
export default deadlineSlice.reducer;
