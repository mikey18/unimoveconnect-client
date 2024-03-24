import styled from "styled-components";
import Component from "./Component";
import arrowleft from "../../../../assets/arrow-back.svg"
import location from "../../../../assets/location.svg"
import arrowright from "../../../../assets/arrow-right.svg"
import axios from "axios";
import { useState } from "react";

const DIV = styled.div`
    display: flex;
    justify-content: space-between;
    display: grid;

    .ll{
        font-size: 30px;
        font-weight: bold;
        color: #101828;
    }
    .al{
        margin-left: 400px;
        margin-top: 300px;
        display: grid;
        gap: 50px;
        width: 500px;
    }
    .all{
        display: grid;
        gap: 30px;
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
    .location{
        border: 1px solid #9095A9;
        padding: 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        p{
            color: #9095A9;
            max-width: 190px;
            overflow: hidden;
        }
    }
    .opa{
        opacity: 0.5;
    }
`
const ChooseRide = ({ active, 
    setActive, 
    pick_up, 
    drop_off, 
    ride_options, 
    date,
    setPage,
    setprice_and_driver,
    mobility_constrained }) => {
    const back = () => {
        setPage((prev) => prev - 1)
    }
    const [load, setLoad] = useState(false)

    const get_price = () => {
        setLoad(true)
        axios
            .post('http://localhost:8000/request_ride',
                {
                    from_location: pick_up,
                    to_location: drop_off,
                    range:  ride_options.find(x => x.id === active).range,
                    date: date,
                    clas: ride_options.find(x => x.id === active).name,
                    seat: ride_options.find(x => x.id === active).seat,
                    bag: ride_options.find(x => x.id === active).bags,
                    mobility_constrained: mobility_constrained
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: { user_id: JSON.parse(localStorage.getItem('token')).id}
                },
            )
            .then((res) => {
                if (res.data.status === 400) {
                    setLoad(false)
                }
                else {
                    setprice_and_driver(res.data.data)
                    setPage((prev) => prev + 1)
                }
            })
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
                <div className="location">
                    <img
                        src={location}
                        alt="location"
                    />
                    <p>{pick_up}</p>
                    <img
                        src={arrowright}
                        alt="arrowright"
                    />
                    <p>{drop_off}</p>
                </div>
                <p className="ll">Choose a Ride</p>

                <div className="all">
                    {
                        ride_options.map((ride) => (
                            <Component
                                key={ride.id}
                                id={ride.id}
                                name={ride.name}
                                seats={ride.seat}
                                bags={ride.bags}
                                range={ride.range}
                                active={active}
                                setActive={setActive}
                            />
                        ))
                    }
                </div>
                {
                    active ?
                        !load ?
                            <div className="click" onClick={get_price}>Next</div>
                            :
                            <div className="click">Loading...</div>
                        :
                        <div className="click opa">Next</div>
                }
            </div>
        </DIV>
    );
}

export default ChooseRide;