import React, { useState } from 'react'
import "../../../assets/css/components/Login.css";
import { ROUTE_PATH } from '../../../core/common/appRouter';
import { useNavigate } from 'react-router-dom';
import api from '../../../infrastucture/api';
export const LoginPage = () => {
    const [changeState, setChangeState] = useState(false);
    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("123456aA")
    // const router = useRouter()
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const login = await api.login({
            email: email,
            password: password,
        });
        if (login.success == true) {
            sessionStorage.setItem("token", login.data.token)
            navigate(ROUTE_PATH.MAINLAYOUT);
        }
        return false;
    }
    return (
        <div>
            <div className='login'>
                <div className={changeState ? "container right-panel-active" : "container"} id="container">
                    <div className="form-container sign-up-container">
                        <form>
                            <h1>Tạo tài khoản mới?</h1>
                            <input type="text" placeholder="Nhập tên người dùng" />
                            <input value={email} type="email" placeholder="Nhập Email" />
                            <input value={password} type="password" placeholder="Nhập mật khẩu" />
                            <button>Đăng ký</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form>
                            <h1>Đăng nhập</h1>
                            <input onChange={onChangeEmail} type="email" placeholder="Nhập Email" />
                            <input onChange={onChangePassword} type="password" placeholder="Nhập mật khẩu" />
                            <a>Quên mật khẩu?</a>
                            <button onClick={onSubmit}>Đăng nhập</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                {/* <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p> */}
                                <button className="ghost" id="signIn" onClick={() => setChangeState(false)}>Đăng nhập</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                {/* <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p> */}
                                <button className="ghost" id="signUp" onClick={() => setChangeState(true)}>Đăng ký</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
