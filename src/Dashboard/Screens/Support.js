import styled from "styled-components";
import Nav from "../Nav/Nav";
import { FORM } from "../../landing/Login";
import { useState } from "react";
import axios from "axios";

const DIV = styled.div`
   .container{
        margin-left: 239px;
        padding: 20px;
    }
    .headd{
        font-size: 23px;
        padding: 25px 0;
        margin-bottom: 50px;
        border-bottom: 1px solid #9095A9;
    }
    .kkk{
        display: flex;
        justify-content: center;
    }
`
const Support = () => {
    const [load, setLoad] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState(null)

    const click = (e) => {
        e.preventDefault()
        setLoad(true)
        setError(null)
        if (message.length === 0) {
            setError('Field cannot be empty')
            setLoad(false)
        }
        else {
            axios
                .post(JSON.parse(localStorage.getItem('token')).type === "user" ?
                    'http://localhost:8000/post_message':
                    'http://localhost:8000/post_message2',
                    {
                        message: message,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        params: JSON.parse(localStorage.getItem('token')).type === "user"?
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
                        setLoad(false)
                    }
                })
        }
    }

    return (
        <DIV>
            <Nav />
            <div className="container">
                <p className="headd">Support</p>

                <div className="kkk">
                    <FORM onSubmit={click}>
                        <p className="header">Get in touch</p>
                        <p className="description">We’d love to hear from you. Please fill out this form.</p>

                        <div>
                            <label className="label">Message</label>
                            <textarea
                                type="text"
                                className="form-input"
                                placeholder="Enter your complaints here"
                                onChange={(e) => (setMessage(e.target.value))}
                                rows={15}
                            />
                        </div>
                
                        {error && <p>{error}</p>}

                        {
                            load ?
                                <div className="click">Loading...</div>
                                :
                                <button className="click" type="submit">Send</button>
                        }
                    </FORM>
                </div>
            </div>
        </DIV>
    );
}

export default Support;