// TodoListSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { del, get, post, put } from '../../Axios/baseApi';
import { toast } from 'react-toastify';

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: false
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
export const addNewTodo = createAsyncThunk(
  'listTodo/addNewTodo',
  async ({ url, data }) => {
    try {
      const response = await post(url, data); // Thay đổi URL tùy theo API của bạn
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
      return error.response

    }
  }
);
export const deleteTask = createAsyncThunk(
  'listTodo/deleteTask',
  async ({ url }) => {
    try {
      const response = await del(url); // Thay đổi URL tùy theo API của bạn
      return response;
    } catch (error) {
      throw new Error(error.response?.data);
      return error.response

    }
  }
);
export const updateTask = createAsyncThunk(
  'listTodo/updateTask',
  async ({ url,data }) => {
    try {
      const response = await put(url,data); // Thay đổi URL tùy theo API của bạn
      return response;
    } catch (error) {
      throw new Error(error.response?.data);
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
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(getListTodo.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
        state.success = false
      })
      .addCase(getListTodo.rejected, (state, action) => {
        state.loading = false
        // state.error = action.error.message;
        toast.error(action.error.message)
        state.success = false
      })
      .addCase(addNewTodo.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.loading = false
        toast.success("Thêm công việc mới thành công");
        state.success = true
      })
      .addCase(addNewTodo.rejected, (state, action) => {
        state.loading = false
        toast.error(action.error.message)
        state.success = false
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false
        toast.success("Xóa công việc thành công");
        state.success = true
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false
        toast.error(action.error.message)
        state.success = false
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false
        toast.success("Cập nhật công việc thành công");
        state.success = true
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false
        toast.error(action.error.message)
        state.success = false
      })
  },
});

export default ListTodoSlice.reducer;