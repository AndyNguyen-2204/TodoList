// TodoListSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../../Axios/baseApi';
import { toast } from 'react-toastify';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const getListTodo = createAsyncThunk(
  'listTodo/getList',
  async ({ url }) => {
    try {
      const response = await get(url); // Thay đổi URL tùy theo API của bạn
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
      return error.response

    }
  }
);
// Tạo action creator bất đồng bộ để thực hiện cuộc gọi API và cập nhật state trong slice
export const ListTodoSlice = createSlice({
  name: 'ListTodo',
  initialState,
  reducers: {
    // reducers khác ở đây
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null
      })
      .addCase(getListTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true
      })
      .addCase(getListTodo.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        toast.error(action.error.message);
        state.success = null
      })
  },
});

export default ListTodoSlice.reducer;