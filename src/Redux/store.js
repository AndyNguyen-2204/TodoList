import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import TodoListSlice from "./ListTodoSlice/listTodo"
import Login from "./Login/login"
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  TodoList: TodoListSlice,
  Login: Login
});
const persistConfig = {
  key: 'root',
  storage,
  // Add any reducer keys that you want to persist in the "whitelist" array
  whitelist: ['TodoList', 'Login'], // Example: 'user' is the key of the user reducer
};
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunkMiddleware],
})
export const persistor = persistStore(store);