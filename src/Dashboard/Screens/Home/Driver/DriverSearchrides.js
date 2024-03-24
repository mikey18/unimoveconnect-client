import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Bounce } from "react-activity";
import Comp from "./Comp";
import Ride from "./Ride";

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
        color: #9095A9;
        font-size: 30px;
        height: 300px;
    }
`

const DriverSearchrides = () => {
    const [load, setLoad] = useState(true)
    const [data, setData] = useState(null)
    const interval = useRef(null)

    useEffect(() => {
        setLoad(true)
        const load = () => {
            axios
                .get('http://localhost:8000/driver_poll_rides',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        params: { driver_id: JSON.parse(localStorage.getItem('token')).id }
                    },
                )
                .then((res) => {
                    if (res.data.status === 200) {
                        setData(res.data.rides)
                        if(interval.current === null){
                            interval.current = setInterval(() => {
                                load()
                            }, [3000])
                        }
                    }
                    else {
                        setData(res.data.data)
                    }
                    setLoad(false)
                })
        }
        load()

        return () => {
            clearInterval(interval.current)
        }

    }, [])

    return (
        <DIV>
            <div className="container">
                <p className="headd">Rides</p>
                {
                    load ?
                        <div className="load">
                            <Bounce size={50} />
                        </div> :
                        data === null || data.length === 0 ?
                            <div className="load">
                                <p>No rides yet</p>
                            </div>
                            :
                            <div>
                                {
                                    Array.isArray(data) ?
                                        data.map((dat) => (
                                            <Comp
                                                key={dat.id}
                                                data={dat}
                                                setData={setData}
                                                interval={interval}
                                            />
                                        ))
                                        :
                                        <Ride data={data} />
                                }
                            </div>

                }

            </div>
        </DIV>
    );
}

export default DriverSearchrides;