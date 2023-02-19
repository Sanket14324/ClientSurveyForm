import React, { useState } from "react"
import { useNavigate } from 'react-router-dom'
import '../style/login_reg.css';
const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const loginUser = async (e) => {
        e.preventDefault()
        const res = await fetch("/api/user/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email, password
            })
        })
        const data = res.json()
            .then(parseData => {

                localStorage.setItem('UserId', parseData);

            })
        if (res.status == 400 || !data) {
            window.alert("invalid credentials")

        }
        else {
            window.alert("Login successful")

            navigate("/choice")
        }
    }
    return (
        <>
            <div className="con">
                <div className="containerreg">
                    <form method="POST" className="reg-form" id="reg-form">
                        <h1 className="tit">Login</h1>
                        <div className="row">
                            <p><label>Email</label> <input className="input_field" type="email" name="email" id="email" value={email}
                                onChange={(e) => setEmail(e.target.value)} placeholder="xyz@gmail.com" /></p>
                            <p><label>Password</label> <input className="input_field" type="password" name="password" id="password" value={password}
                                onChange={(e) => setPassword(e.target.value)} placeholder="password" /></p>
                        </div>
                        <div className="bu">
                            <input className="re" type="submit" value="Login" id="Login" onClick={loginUser} />
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}
export default Login
