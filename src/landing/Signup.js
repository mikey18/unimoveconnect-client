import styled from "styled-components";
import Nav from "./Nav";
import { LAND } from "./Login";
import { FORM } from "./Login";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import Image from "./Image";
import { useState } from "react";
import axios from "axios";
import Choice from "./Choice";

export const NAME_DIV = styled.div`
    display: flex;
    justify-content: space-between;
`
const Signup = ({ setAuth }) => {
    const [load, setLoad] = useState(false)
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [matric, setMatric] = useState('')
    const [platenumber, setPlateNumber] = useState('')

    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const [choice, setChoice] = useState('student')

    // const nav = useNavigate()

    const onclick = (e) => {
        e.preventDefault()
        setLoad(true)
        setError(null)
        if (choice === 'student' && (firstname.trim().length === 0 ||
            lastname.trim().length === 0 ||
            matric.trim().length === 0 || password.trim().length === 0)) {
            setError('Fields cannot be empty')
            setLoad(false)
        }
        if (choice === 'driver' && (firstname.trim().length === 0 ||
            lastname.trim().length === 0 ||
            platenumber.trim().length === 0 || password.trim().length === 0)) {
            setError('Fields cannot be empty')
            setLoad(false)
        }
        else {
            axios
                .post(choice === 'student' ? 'http://localhost:8000/create_user':'http://localhost:8000/create_driver',
                    choice === 'student' ? {
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        matric_no: matric,
                        password: password
                    } : {
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        platenumber: platenumber,
                        password: password
                    },
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
                <FORM onSubmit={onclick}>
                    <div className="loggo">
                        <img
                            src={logo}
                            alt="log"
                            className="logo"
                        />
                    </div>
                    <p className="header">Sign up</p>

                    <p className="description">Welcome back, Please enter your details.</p>
                    <Choice 
                        choice={choice}
                        setChoice={setChoice}
                    />
                    <NAME_DIV>
                        <div>
                            <label className="label">First Name</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter first name"
                                onChange={(e) => (setFirstname(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="label">Last Name</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter last name"
                                onChange={(e) => (setLastname(e.target.value))}
                            />
                        </div>
                    </NAME_DIV>
                    {
                        choice === 'student' ?
                            <div>
                                <label className="label">Matric Number</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter matric number"
                                    onChange={(e) => (setMatric(e.target.value))}
                                />
                            </div>
                            :
                            <div>
                                <label className="label">Plate Number</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter plate number"
                                    onChange={(e) => (setPlateNumber(e.target.value))}
                                />
                            </div>
                    }
                   
                    <div>
                        <label className="label">Email address</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="Enter email address"
                            onChange={(e) => (setEmail(e.target.value))}
                        />
                    </div>
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
                            <button className="click" type="submit">Sign up</button>
                    }

                    <p className="dont">Already have an account? <span><Link to="/login" className="go">Log in</Link></span></p>

                </FORM>
                <Image />
            </LAND>
        </>
    );
}

export default Signup;