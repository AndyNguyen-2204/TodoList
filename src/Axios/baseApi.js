import axios from 'axios';
const BASE_URL = 'http://localhost:8080/api';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Thời gian tối đa để chờ cuộc gọi API (5 giây trong ví dụ này)
});

// Hàm GET để lấy dữ liệu từ API
export const get = (url, params = {}) => axiosInstance.get(url, { params });

// Hàm POST để gửi dữ liệu lên API
export const post = (url, data) => axiosInstance.post(url, data);

// Hàm PUT để cập nhật dữ liệu lên API
export const put = (url, data) => axiosInstance.put(url, data);

// Hàm DELETE để xóa dữ liệu khỏi API
export const del = (url) => axiosInstance.delete(url);