import { configureStore } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import  FilterBlockSlice  from './FilterBlockSlice/filterBlock'
import TodoListSlice from "./ListTodoSlice/listTodo"
import Login from "./Login/login"
import thunkMiddleware from 'redux-thunk';
export const store = configureStore({
  reducer: {
    TodoList: TodoListSlice,
    FilterBlock:FilterBlockSlice,
    Login:Login
  },
  middleware: [thunkMiddleware],
})