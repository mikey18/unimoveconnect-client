import styled from "styled-components";
import Nav from "../../Nav/Nav";
import Upcoming from "./Upcoming";
import Previous from "./Previous";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "react-activity/dist/library.css";
import { Bounce } from "react-activity";

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
    .load{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
const Trips = () => {
    const [load, setLoad] = useState(true)
    const [fetched, setfetched] = useState(false)
    const [ongoing, setOngoing] = useState(null)
    const [previous, setPrevious] = useState([])

    const check_rides = useCallback(() => {
        setLoad(true)

        if (JSON.parse(localStorage.getItem('token')).type === 'user') {
            axios
                .get('http://localhost:8000/fetch_rides',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        params: { user_id: JSON.parse(localStorage.getItem('token')).id }
                    },
                )
                .then((res) => {
                    setOngoing(res.data.ongoing)
                    setPrevious(res.data.previous)
                    setfetched(true)
                    setLoad(false)
                })
        } else {
            axios
                .get('http://localhost:8000/fetch_driver_rides',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        params: { driver_id: JSON.parse(localStorage.getItem('token')).id }
                    },
                )
                .then((res) => {
                    setPrevious(res.data.data)
                    setfetched(true)
                    setLoad(false)
                })
        }

    }, [])

    useEffect(() => {
        if (fetched === false) {
            check_rides()
        }
    }, [check_rides, fetched])

    return (
        <DIV>
            <Nav />

            <div className="container">
                <p className="headd">My Trips</p>
                {
                    JSON.parse(localStorage.getItem('token')).type === 'user' ?
                        load ?
                            <div className="load">
                                <Bounce size={50} />
                            </div>
                            :
                            <>
                                <Upcoming data={ongoing}
                                    setOngoing={setOngoing}
                                    setPrevious={setPrevious}
                                />
                                <Previous data={previous} />
                            </>
                        :
                        load ?
                            <div className="load">
                                <Bounce size={50} />
                            </div>
                            :
                            <Previous data={previous} />
                }

            </div>
        </DIV>
    );
}

export default Trips;