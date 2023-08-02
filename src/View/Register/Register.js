import { useState, ChangeEvent, useEffect } from "react";
import { registerUser } from '../../Redux/Login/login';
import { useDispatch, useSelector } from "react-redux";
import "../Login/Login.css"
import { useNavigate } from "react-router";

function Register() {
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const success = useSelector((state) => state.Login.success)

  const handleChangeInput = (e) => {
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

  const handleRegisterAccount = () => {
    // Thực hiện xử lý đăng nhập ở đây
    const data = {
      username: value.username,
      password: value.password,
      avatar:""
    };
    dispatch(registerUser({ url: '/register', data }));
  };

  const handleBackLogin = () => {
    navigate("/login")
  }
  useEffect(() => {
    if (success !== null) {
      setValue({
        username: "",
        password: ""
      })
    }
  }, [success])
  return (
    <div className="wrap_pageLogin">
      <div className="container">
        <h2 className="login-title">Đăng ký</h2>
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
          <button className="button-login" onClick={handleRegisterAccount}>Đăng ký</button>
          <span onClick={handleBackLogin} className="hasAccount-login">Quay lại đăng nhập?</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
