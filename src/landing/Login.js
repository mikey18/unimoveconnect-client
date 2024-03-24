import styled from "styled-components";
import Nav from "./Nav";
import logo from "../assets/logo.svg"
import { Link } from "react-router-dom";
import Image from "./Image";
import { useState } from "react";
import axios from "axios";
import Choice from "./Choice";

export const LAND = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 50px;
    position: absolute;
    top: 70px;
    bottom: 70px;
    align-items: center;
`

export const FORM = styled.form`
    display: grid;
    gap: 30px;
    width: 500px;
    
    .loggo{
        display: flex;
        justify-content: center;
    }
    .header{
        text-align: center;
        color: #344054;
        font-weight: bold;
        font-size: 35px;
    }
    .description{
        text-align: center;
        color: #344054;
    }
    .label{
        display: block;
        font-size: 15px;
        color: #344054;
    }
    .form-input{
        width: 100%;
        padding: 15px;
        border-radius: 5px;
        border: 1px solid #D0D5DD;
        color: #344054;
        font-size: 15px;
    }
    .form-input:focus{
        outline: none !important;
    }
    .click{
        background-color: #1098F7;
        color: white;
        font-weight: bold;
        width: 100%;
        height: 44px;
        gap: 8px;
        border-radius: 8px;
        cursor: pointer;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .dont{
        text-align: center;
    }   
    .go{
        color: #1098F7;
        text-decoration: none;
        font-weight: bold;

    }
`
const Login = ({ setAuth }) => {
    const [load, setLoad] = useState(false)
    const [matric, setMatric] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    // const nav = useNavigate()
    const [choice, setChoice] = useState('student')

    const login = (e) => {
        e.preventDefault()
        setLoad(true)
        setError(null)
        if (choice === 'student' && (matric.trim().length === 0 || password.trim().length === 0)) {
            setError('Fields cannot be empty')
            setLoad(false)
        }
        if (choice === 'driver' && (email.trim().length === 0 || password.trim().length === 0)) {
            setError('Fields cannot be empty')
            setLoad(false)
        }
        else {
            axios
                .post(choice === 'student' ? 'http://localhost:8000/login_user' : 'http://localhost:8000/login_driver',
                    choice === 'student' ?
                        {
                            matric_no: matric,
                            password: password
                        }
                        :
                        {
                            email: email,
                            password: password
                        }
                    ,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                )
                .then((res) => {
                    if (res.data.status === 400) {
                        setError(res.data.msg)
                        setLoad(false)
                    }
                    else {
                        localStorage.setItem('token', JSON.stringify(res.data.data))
                        setAuth(true)

                    }
                })
        }
    }

    return (
        <>
            <Nav />
            <LAND>
                <FORM onSubmit={login}>
                    <div className="loggo">
                        <img
                            src={logo}
                            alt="log"
                            className="logo"
                        />
                    </div>
                    <p className="header">Log in</p>

                    <p className="description">Welcome back, Please enter your details.</p>
                    <Choice
                        choice={choice}
                        setChoice={setChoice}
                    />
                    {
                        choice === 'student' ?
                            <div>
                                <label className="label">Matric No</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter your matric no"
                                    onChange={(e) => (setMatric(e.target.value))}
                                />
                            </div> :
                            <div>
                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder="Enter your email"
                                    onChange={(e) => (setEmail(e.target.value))}
                                />
                            </div>
                    }

                    <div>
                        <label className="label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="Enter your password"
                            onChange={(e) => (setPassword(e.target.value))}
                        />
                    </div>

                    {error && <p>{error}</p>}

                    {
                        load ?
                            <div className="click">Loading...</div>
                            :
                            <button className="click" type="submit">Sign in</button>
                    }

                    <p className="dont">Don't have an account? <span><Link to="/signup" className="go">Sign up</Link></span></p>

                </FORM>
                <Image />
            </LAND>
        </>

    );
}

export default Login;