// TodoListSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Tạo action creator bất đồng bộ để thực hiện cuộc gọi API và cập nhật state trong slice
export const ListTodoSlice = createSlice({
  name: 'ListTodo',
  initialState,
  reducers: {
    // reducers khác ở đây
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Đăng ký tài khoản thành công!");
        state.success = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        toast.error(action.error.message);
        state.success = null
      })
  },
});

export default ListTodoSlice.reducer;