# Student Deadline Tracker
Bài thực hành 01 – LTWNC (RIPT1411-20261-01). Ứng dụng quản lý deadline bài tập cá nhân.

## 1. Công nghệ
React 18+, TypeScript, Redux Toolkit, React Redux, Vite, CSS thuần (không thêm thư viện UI để project gọn, dễ giải thích).

## 2. Cài đặt & chạy
```bash
npm install
npm run dev      # chạy dev tại http://localhost:5173
npm run build    # kiểm tra TypeScript + build production
```
Thử trạng thái lỗi: mở `http://localhost:5173/?error=1` (có nút "Thử lại").

## 3. Cấu trúc thư mục
```
src/
├── app/            store.ts (configureStore), hooks.ts (typed hooks)
├── features/deadlines/
│   ├── components/ DeadlineCard (Compound), DeadlineList, DeadlineForm, FilterBar, DeadlineStats
│   ├── hooks/      useDeadlineFilter, useDeadlineForm
│   ├── deadlineSlice.ts   deadlineThunk.ts   deadlineTypes.ts
├── services/       deadlineApi.ts (API giả lập)
├── types/          api.ts (ApiResponse<T>)
└── utils/          date.ts (tính ngày)
```

## 4. Chức năng
Danh sách bài tập; thêm qua form (có validation); hoàn thành/bỏ hoàn thành; xóa; lọc 4 trạng thái; hiển thị "Còn X ngày / Hạn hôm nay / Quá hạn Y ngày"; dashboard thống kê; trạng thái loading/error/empty; responsive.

## 5. TypeScript nâng cao
- **Generic**: `ApiResponse<T>` (`types/api.ts`), `mockRequest<T>` (`services/deadlineApi.ts`).
- **Utility Types** (`deadlineTypes.ts`): `Omit` (CreateDeadlineInput), `Partial` + `Record` (DeadlineFormErrors), `Record` (FILTER_LABELS, matchers).
- **Type Guard**: `isDeadline(value: unknown)` – lọc dữ liệu API trước khi vào store (`deadlineThunk.ts`).

## 6. Custom Hook
- `hooks/useDeadlineFilter.ts`: lọc + đếm thống kê (dùng trong `App.tsx`).
- `hooks/useDeadlineForm.ts`: state, validation, reset form (dùng trong `DeadlineForm.tsx`).

## 7. Design Pattern: Compound Component
`components/DeadlineCard.tsx`: `DeadlineCard` giữ dữ liệu trong Context; `.Subject/.Title/.Meta/.Actions` tự lấy dữ liệu qua `useCard()`. Giúp ghép card linh hoạt, không phải truyền props qua nhiều tầng (xem `DeadlineList.tsx`).

## 8. Redux Toolkit
`configureStore` (`app/store.ts`), `createSlice` (`deadlineSlice.ts`, state: items/status/error/filter), typed hooks `useAppDispatch/useAppSelector` (`app/hooks.ts`), cấu trúc feature-based.

## 9. createAsyncThunk
`fetchDeadlines` (`deadlineThunk.ts`) được dispatch trong `App.tsx` khi khởi động. `pending` → status `loading`; `fulfilled` → lưu items; `rejected` → status `failed` + thông báo lỗi. Xử lý trong `extraReducers` của slice.

## 10. API giả lập
`services/deadlineApi.ts`: trả `ApiResponse<unknown[]>` sau 0.9s, ngày mẫu tính theo hôm nay nên luôn có đủ còn hạn / quá hạn / đã xong.

## 11. Câu hỏi giảng viên có thể hỏi
- **Vì sao dùng typed hooks?** Tự động có kiểu RootState/AppDispatch, không phải gõ lại ở mỗi component.
- **Vì sao `isDeadline` nhận `unknown`?** Dữ liệu từ API không đáng tin; guard kiểm tra tại runtime rồi thu hẹp kiểu.
- **Vì sao chọn Compound Component thay vì HOC?** Card có nhiều phần UI cần sắp xếp linh hoạt; HOC phù hợp logic cắt ngang (auth, logging) hơn.
- **Tính ngày thế nào để không lệch timezone?** So sánh "số ngày UTC" của hai ngày (`utils/date.ts`), bỏ giờ phút.
- **Vì sao form dùng state cục bộ, không đưa vào Redux?** Dữ liệu tạm của form chỉ UI cần; Redux chỉ giữ state dùng chung.
- **createAsyncThunk khác reducer thường ở đâu?** Xử lý bất đồng bộ, tự sinh 3 action pending/fulfilled/rejected.
- **Filter "Quá hạn" tính thế nào?** `!completed && dueDate < hôm nay`.
