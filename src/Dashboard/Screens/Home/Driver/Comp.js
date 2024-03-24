import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const DIV = styled.div`
    border: 1px solid grey;
    padding: 30px;
    border-radius: 20px;
    max-width: 800px;
    margin: auto;
    display: grid;
    gap: 10px;

    p{
        color: grey;
    }
    .accept{
        background-color: black;
        width: 100px;
        padding: 20px;
        color: white;
        text-align: center;
        font-weight: bold;
        cursor: pointer;
    }

`
const Comp = ({ data, setData, interval }) => {
    const [load, setLoad] = useState(false)
    const mark = () => {
        setLoad(true)
        axios
            .post('http://localhost:8000/accept_ride',
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: {
                        driver_id: JSON.parse(localStorage.getItem('token')).id,
                        ride_id: data.id
                    }
                },
            )
            .then((res) => {
                if(res.data.status === 200){
                    clearInterval(interval.current)
                    setData(res.data.data)
                    setLoad(false)
                }
            })
    }
    return (  
        <DIV>
            <p>Name: {data.firstname} {data.lastname}</p>
            <p>Matric Number: {data.matric_no}</p>
            <p>Pick up: {data.from_location}</p>
            <p>Destination: {data.to_location}</p>
            <p>Price: {data.price}</p>
            <p>Date: {data.date}</p>

            {
                load ?
                <div className="accept">Loading..</div>
                :
                <div className="accept" onClick={mark}>Accept</div>
            }
        </DIV>
    );
}
 
export default Comp;