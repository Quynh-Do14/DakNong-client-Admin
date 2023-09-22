
import React, { useEffect, useState } from 'react'
import "../../../assets/css/components/Login.css";
import { ROUTE_PATH } from '../../../core/common/appRouter';
import { useNavigate } from 'react-router-dom';
import api from '../../../infrastucture/api';
import { FullPageLoading } from '../../../infrastucture/common/components/controls/loading';
import Constants from '../../../core/common/constant';
export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    let storage = sessionStorage.getItem(Constants.TOKEN);
    useEffect(() => {
        if (storage) {
            navigate(ROUTE_PATH.MAINLAYOUT);
        };
    }, [])

    // const router = useRouter()
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        const login = await api.login({
            email: email,
            password: password,
        },
            setLoading
        );
        if (login.success == true) {
            sessionStorage.setItem(Constants.TOKEN, login.data.token)
            navigate(ROUTE_PATH.MAINLAYOUT);
        }
        return false;
    }
    return (
        <div>
            <div className='login'>
                <div className={"container"} id="container">
                    <div className="form-container sign-in-container">
                        <form>
                            <h1>Đăng nhập</h1>
                            <input value={email} onChange={onChangeEmail} type="email" placeholder="Nhập Email" />
                            <input value={password} onChange={onChangePassword} type="password" placeholder="Nhập mật khẩu" />
                            <a>Quên mật khẩu?</a>
                            <button onClick={onSubmit}>Đăng nhập</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                        </div>
                    </div>
                </div>

            </div>
            <FullPageLoading isLoading={loading} />
        </div>
    )
}
