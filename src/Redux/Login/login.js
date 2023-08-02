import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get, post, postFormData } from '../../Axios/baseApi'; // Import hàm post từ module api.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Khai báo kiểu dữ liệu cho state
const initialState = {
  dataUser: null,
  loading: false,
  error: null,
  message: null,
  success: null,
  login: false
};

// Tạo action creator bất đồng bộ để thực hiện cuộc gọi API và cập nhật state trong slice
export const registerUser = createAsyncThunk(
  'dataUser/register',
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
export const loginUser = createAsyncThunk(
  'dataUser/login',
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
export const logOutUser = createAsyncThunk(
  'dataUser/logOutUser',
  async (url) => {
    try {
      const response = await get(url); // Thay đổi URL tùy theo API của bạn
      return response.data;
    } catch (error) {
      throw new Error(error.response.data);
      return error.response
    }
  }
);
export const uploadAvatar = createAsyncThunk(
  'dataUser/uploadAvatar',
  async (data, thunkAPI) => { // Không cần truyền tham số url vào, vì đã được định nghĩa trong axiosInstance
    try {
      const response = await postFormData('/upload', data); // Gọi API upload với endpoint '/upload'
      return response.data; // Trả về dữ liệu từ backend (link avatar đã được upload)
    } catch (error) {
      throw new Error(error.response.data); // Nếu có lỗi, throw một lỗi mới để xử lý
    }
  }
);

export const LoginSlice = createSlice({
  name: 'Login',
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
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.login = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.dataUser = action.payload; // Sử dụng action.payload.data vì action.payload có kiểu RegisterResponse
        state.loading = false;
        localStorage.setItem("accesstoken", action.payload.token)
        if(localStorage.getItem("accesstoken")){
          state.login = true
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.login = false
        // state.error = action.error.message;
        toast.error(action.error.message)
      })
      .addCase(logOutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.clear()
        state.login = false
        state.dataUser = null
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        toast.error(action.error.message);
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;

      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
        toast.error(action.error.message);
      });
  },
});

// Action creators không cần thay đổi, vẫn giữ nguyên như trước
export default LoginSlice.reducer;
