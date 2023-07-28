// TodoListSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { post,get } from '../../Axios/baseApi'; // Import hàm post từ module api.js

const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Tạo action creator bất đồng bộ để thực hiện cuộc gọi API và cập nhật state trong slice
export const fetchData = createAsyncThunk('todoList/fetchData', async (url) => {
  try {
    const response = await get(url); // Thay đổi URL tùy theo API của bạn
    return response.data;
  } catch (error) {
    throw new Error('Lỗi khi lấy dữ liệu từ API:', error);
  }
});

export const TodoListSlice = createSlice({
  name: 'TodoList',
  initialState,
  reducers: {
    // reducers khác ở đây
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Action creators không cần thay đổi, vẫn giữ nguyên như trước
export const { addTodo, completedTodo, deleteTodo } = TodoListSlice.actions;

export default TodoListSlice.reducer;