import { useState,ChangeEvent } from "react";
import { loginUser, registerUser } from '../../Redux/Login/login';
import { useDispatch } from "react-redux";
import "./Login.css"
import { useNavigate } from "react-router";

function Login(){
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>)=> {
    // Lấy tên trường nhập liệu (username hoặc password)
    const fieldName = e.target.name;

    // Lấy giá trị nhập liệu
    const fieldValue = e.target.value;

    // Cập nhật giá trị của trường nhập liệu tương ứng trong state
    setValue((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleLogin = () => {
    // Thực hiện xử lý đăng nhập ở đây
    const data = {
      username:value.username,
      password:value.password
    };
    dispatch(loginUser({ url: '/login', data }));
  };

  const handleRegister =()=>{
    navigate("/register")
  }

  return (
    <div className="wrap_pageLogin">
      <div className="container">
      <h2 className="login-title">Đăng nhập</h2>
      <div className="wrap-input-login">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Nhập tên tài khoản..."
          value={value.username}
          onChange={handleChangeInput}
        />
      </div>
      <div className="wrap-input-login">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Nhập mật khẩu tài khoản...."
          value={value.password}
          onChange={handleChangeInput}
        />
      </div>
      <div className="wrap-button-login">
      <button className="button-login" onClick={handleLogin}>Đăng nhập</button>
      <span onClick={handleRegister} className="hasAccount-login">Bạn chưa có tài khoản?</span>
      </div>
      </div>
    </div>
  );
};

export default Login;
