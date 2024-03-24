import styled from "styled-components";
import Nav from "../Nav/Nav";
import gradient from "../../assets/gradient.svg"
import user from "../../assets/user.svg"
import { FORM } from "../../landing/Login";
import { NAME_DIV } from "../../landing/Signup";
import { useState } from "react";
import axios from "axios";


const DIV = styled.div`
    .container{
        margin-left: 239px;
        position: relative;
    }
    .gradient{
        position: absolute;
        left: 0;
        right: 0;
        height: 250px;
    }
    .jj{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .second{
        position: absolute;
        top: 200px;
        width: 90%;
        height: 600px;
        z-index: 1;
        margin: auto;
        left: 0;
        right: 0;
        display: grid;
    }
    .user{
        width: 200px;
        border: 6px solid white;
        border-radius: 100px;
    }
    .kk{
        display: flex;
        height: 205px;
        align-items: center;
        gap: 30px;
    }
    .namee{
        color: white;
        font-size: 40px;
        color: #344054;
    }
    .email{
        color: #344054;
    }
    .kkk{
        width: 100%;
        display: flex;
        justify-content: center;
    }
`
const Settings = () => {
    const [load, setLoad] = useState(false)
    const [firstname, setFirstname] = useState(JSON.parse(localStorage.getItem('token')).firstname)
    const [lastname, setLastname] = useState(JSON.parse(localStorage.getItem('token')).lastname)
    const [email, setEmail] = useState(JSON.parse(localStorage.getItem('token')).email)
    const [matric, setMatric] = useState(JSON.parse(localStorage.getItem('token')).matric_no)
    const [platenumber, setPlatenumber] = useState(JSON.parse(localStorage.getItem('token')).platenumber)
    const [error, setError] = useState(null)


    const click = (e) => {
        e.preventDefault()
        setLoad(true)
        setError(null)
        if (JSON.parse(localStorage.getItem('token')).type === 'user' && 
            (firstname.length === 0 ||
            lastname.length === 0 ||
            matric.length === 0 ||
            email.length === 0)) {
            setError('Fields cannot be empty')
            setLoad(false)
        }
        if (JSON.parse(localStorage.getItem('token')).type === 'driver' && 
            (firstname.length === 0 ||
            lastname.length === 0 ||
            platenumber.length === 0 ||
            email.length === 0)) {
            setError('Fields cannot be empty')
            setLoad(false)
        }
        else {
            axios
                .put(JSON.parse(localStorage.getItem('token')).type === 'user' ?
                    'http://localhost:8000/update_user' :
                    'http://localhost:8000/update_driver'
                    ,
                    JSON.parse(localStorage.getItem('token')).type === 'user' ?
                        {
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            matric_no: matric,
                        }
                        :
                        {
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            platenumber: platenumber,
                        }
                    ,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        params: JSON.parse(localStorage.getItem('token')).type === 'user' ?
                        {
                            user_id: JSON.parse(localStorage.getItem('token')).id,
                        }
                        :
                        {
                            driver_id: JSON.parse(localStorage.getItem('token')).id,
                        }
                    },
                )
                .then((res) => {
                    if (res.data.status === 400) {
                        setError(res.data.msg)
                        setLoad(false)
                    }
                    else {
                        setError('Successful')
                        localStorage.setItem('token', JSON.stringify(res.data.data))
                        setLoad(false)
                    }
                })
        }
    }

    return (
        <DIV>
            <Nav />
            <div className="container">
                <div className="gradient">
                    <img
                        src={gradient}
                        alt="grad"
                        className="jj"
                    />
                </div>
                <div className="second">
                    <div className="kk">
                        <img
                            src={user}
                            alt="grad"
                            className="user"
                        />
                        <div>
                            <p className="namee">{JSON.parse(localStorage.getItem('token')).firstname} {JSON.parse(localStorage.getItem('token')).lastname}</p>
                            <p className="email">{JSON.parse(localStorage.getItem('token')).email}</p>
                        </div>

                    </div>
                    <div className="kkk">
                        <FORM onSubmit={click}>
                            <NAME_DIV>
                                <div>
                                    <label className="label">First Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Enter first name"
                                        onChange={(e) => (setFirstname(e.target.value))}
                                        defaultValue={firstname}
                                    />
                                </div>
                                <div>
                                    <label className="label">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Enter last name"
                                        onChange={(e) => (setLastname(e.target.value))}
                                        defaultValue={lastname}
                                    />
                                </div>
                            </NAME_DIV>
                            {
                                JSON.parse(localStorage.getItem('token')).type === 'user' ?
                                    <div>
                                        <label className="label">Matric Number</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            placeholder="Enter matric number"
                                            onChange={(e) => (setMatric(e.target.value))}
                                            defaultValue={matric}
                                        />
                                    </div>
                                    :
                                    <div>
                                        <label className="label">Plate Number</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            placeholder="Enter plate number"
                                            onChange={(e) => (setPlatenumber(e.target.value))}
                                            defaultValue={platenumber}
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
                                    defaultValue={email}
                                />
                            </div>
                            {error && <p>{error}</p>}
                            {
                                load ?
                                    <div className="click">Loading...</div>
                                    :
                                    <button className="click" type="submit">Save</button>
                            }
                        </FORM>
                    </div>

                </div>

            </div>
        </DIV>
    );
}

export default Settings;