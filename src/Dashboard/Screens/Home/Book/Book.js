import styled from "styled-components";
// import driver from "../../../../assets/driver.svg"
// import star from "../../../../assets/star.svg"
import fro from "../../../../assets/from.svg"
import to from "../../../../assets/to.svg"
import walet from "../../../../assets/walle.svg"
import Component from "./Component";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import arrowleft from "../../../../assets/arrow-back.svg"
import { Sentry } from "react-activity";

const DIV = styled.div`
    /* justify-content: space-between; */
    .al{
        margin-left: 400px;
        margin-top: 300px;
        display: grid;
        gap: 50px;
        width: 600px;
        border: 1px solid #9095A9;
        padding: 40px;
        border-radius: 20px;
    }
    .sen{
        display: flex;
        justify-content: center;
    }
    .all{
        display: grid;
        gap: 30px;
        justify-content: center;
        border: 1px solid #9095A9;
        border-radius: 20px;
        padding: 20px;
        align-items: center;
    }
    .info{
        display: grid;
        gap: 3px;
    }
    .plate{
        font-size: 25px;
        font-weight: bold;
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
    .list{
        display: grid;
        gap: 20px;
    }
`

const Book = ({
    pick_up,
    drop_off,
    setPage,
    price_and_driver,
}) => {
    const nav = useNavigate()

    const data = [
        {
            id: 1,
            icon: fro,
            text: pick_up
        },
        {
            id: 2,
            icon: to,
            text: drop_off
        },
        {
            id: 3,
            icon: walet,
            text: `₦${price_and_driver.price.toLocaleString()}`
        }
    ]
    useEffect(() => {
        const interval = setInterval(() => {
            axios
                .get('http://localhost:8000/poll_ride',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        params: { ride_id: price_and_driver.id, user_id: JSON.parse(localStorage.getItem('token')).id }
                    },
                )
                .then((res) => {
                    if (res.data.status === 400) {
                        
                    }
                    else {
                        clearInterval(interval)
                        localStorage.setItem('token', JSON.stringify(res.data.data))
                        nav('/trips')
                    }
                })
        }, [3000])

        return () => {
            clearInterval(interval)
        }
    }, [price_and_driver.id, nav])

    const back = () => {
        setPage((prev) => prev - 1)
    }
    return (
        <DIV>
            <div className="al">
                <div onClick={back}>
                    <img
                        src={arrowleft}
                        alt="left"
                    />
                </div>
                <div className="all">
                    {/* <img
                        src={driver}
                        alt="left"
                    />
                    <div className="info">
                        <p>{price_and_driver.driver.name}</p>
                        <p className="plate">{price_and_driver.driver.platenumber}</p>
                        <p><span>  <img
                            src={star}
                            alt="left"
                        /></span>{price_and_driver.driver.rating}</p>
                    </div> */}
                    <div className="sen">
                        <Sentry color="black" size={50} />
                    </div>
                    <p>Hold on, Connecting you to a driver...</p>
                </div>

                <div className="list">
                    {
                        data.map((dat) => (
                            <Component
                                key={dat.id}
                                icon={dat.icon}
                                text={dat.text}
                            />
                        ))
                    }
                </div>
                {/* {
                    !load ?
                        <div className="click" onClick={request_ride}>Book</div>
                        :
                        <div className="click">Loading...</div>
                } */}
            </div>
        </DIV>
    );
}

export default Book;