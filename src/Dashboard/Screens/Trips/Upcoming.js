import styled from "styled-components";
import bigcar from "../../../assets/big_car.svg"
import location from "../../../assets/location.svg"
import arrowright from "../../../assets/arrow-right.svg"
import fro from "../../../assets/from.svg"
import walet from "../../../assets/walle.svg"
import Component from "../Home/Book/Component";
import notrip from "../../../assets/notrip.svg"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const DIV = styled.div`
    .head{
        font-size: 23px;
        font-weight: bold;
    }
    .all{
        display: flex;
        margin-bottom: 50px;
        gap: 20px;
    }
    .first{
        border-right: 1px solid #9095A9;
        padding-right: 20px;
    }
    .txt{
        color: #9095A9;
    }
    .doen{
        display: flex;
        justify-content: space-between;
    }
    .one{
        font-size: 20px;
        font-weight: bold;
    }
    .location{
        border: 1px solid #9095A9;
        padding: 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        p{
            color: #9095A9;
            max-width: 190px;
            overflow: hidden;
        }
    }
    .list{
        display: grid;
        gap: 20px;
    }
    .noo{
        width: 100%;
        display: grid;
        justify-content: center;
        gap: 20px;
    }
    .button{
        background-color: #1098F7;
        color: white;
        font-weight: bold;
        width: 150px;
        height: 44px;
        gap: 8px;
        border-radius: 8px;
        cursor: pointer;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
    }
    .mark{
        background-color: black;
        width: 180px;
        color: white;
        padding: 20px;
        text-align: center;
        border-radius: 10px;
        margin-top: 50px;
        cursor: pointer;
    }
    .second{
    }
    .info{
        display: grid;
    }
    .p{
        font-size: 20px;
        color: #9095A9;
    }
`

const Upcoming = ({ data, setOngoing,
    setPrevious }) => {
    const nav = useNavigate()
    const [load, setLoad] = useState(false)

    const mark = () => {
        setLoad(true)
        axios
            .post('http://localhost:8000/completed_ride',
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: {
                        user_id: JSON.parse(localStorage.getItem('token')).id,
                        ride_id: data.id
                    }
                },
            )
            .then((res) => {
                setOngoing(res.data.ongoing)
                setPrevious(res.data.previous)
                setLoad(false)
            })
    }
    const go = () => {
        nav('/home')
    }
    const date = new Date(data !== null && data.date);

    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    const dataa = [
        {
            id: 1,
            icon: fro,
            text: formattedDate
        },
        {
            id: 2,
            icon: walet,
            text: `₦${JSON.parse(localStorage.getItem('token')).wallet.toLocaleString()}`
        }
    ]


    return (
        <DIV>
            {
                data === null ?
                    <div className="noo">
                        <img
                            src={notrip}
                            alt="no"
                        />
                        <div className="button" onClick={go}>
                            Book a ride
                        </div>
                    </div> :
                    <div>
                        <p className="head">Ongoing</p>

                        <div className="all">
                            <div className="first">
                                <img
                                    src={bigcar}
                                    alt="car"
                                />
                                <div className="doen">
                                    <div>
                                        <p className="txt one">{data.class}</p>
                                        <p className="txt">{data.seat} seat(s), {data.bag} Bag(s)</p>
                                    </div>

                                    <p className="txt one">₦{data.price.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="second">
                                <div className="location">
                                    <img
                                        src={location}
                                        alt="location"
                                    />
                                    <p>{data.from_location}</p>
                                    <img
                                        src={arrowright}
                                        alt="arrowright"
                                    />
                                    <p>{data.to_location}</p>
                                </div>
                                <div className="list">
                                    {
                                        dataa.map((dat) => (
                                            <Component
                                                key={dat.id}
                                                icon={dat.icon}
                                                text={dat.text}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="info">
                                <p className="head">Driver Details</p>
                                <p className="p">Name: {data.driver.name}</p>
                                <p className="p">Plate Number: {data.driver.platenumber}</p>
                            </div>
                        </div>

                        {
                            load ?
                                <div className="mark">Loading...</div> :
                                <div className="mark" onClick={mark}>Mark completed</div>

                        }
                    </div>
            }
        </DIV>
    );
}

export default Upcoming;