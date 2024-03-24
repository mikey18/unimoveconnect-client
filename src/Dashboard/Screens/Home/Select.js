import styled from "styled-components";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import axios from "axios";

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
    .form-input{
        width: 100%;
        padding: 15px;
        border-radius: 5px;
        border: 1px solid #D0D5DD;
        color: #344054;
        font-size: 15px;
    }
    .yy{
        color: grey;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
    }
    .yy:hover{
        border: 1px solid #1098F7;
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
    .opa{
        opacity: 0.5;
    }
    .date{
        cursor: pointer;
    }
    .radio{
        border: 2px solid #1098F7;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .rradio{
        background-color: #1098F7;
        border-radius: 20px;
        width: 10px;
        height: 10px;
    }
    .radio2{
        border: 2px solid lightgrey;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .rradio2{
        background-color: lightgrey;
        border-radius: 20px;
        width: 10px;
        height: 10px;
    }
`
const Select = ({
    pick_up,
    drop_off,
    setPickup,
    setDrop_off,
    date,
    setDate,
    setPage,
    setride_options,
    mobility_constrained,
    setmobility_constrained
}) => {
    const [load, setLoad] = useState(false)
    const [error, setError] = useState(null)
    const minDate = new Date(); // Set the minimum date to today

    const handleDateChange = date => {
        setDate(date);
    };

    const check_rides = (e) => {
        e.preventDefault()
        setError(null)
        setLoad(true)
        axios
        .get('http://localhost:8000/initiate_ride',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {user_id: JSON.parse(localStorage.getItem('token')).id}
            },
        )
        .then((res) => {
            if(res.data.status === 400){
                setError(res.data.msg)
                setLoad(false)
            }
            else{
                setride_options(res.data.data)
                setPage((prev) => prev + 1)
            }
        })
    }

    return (
        <DIV>
            <form className="al" onSubmit={check_rides}>
                <p className="ll">Where To?</p>

                <div className="all">
                    <input className="form-input" defaultValue = {pick_up} placeholder="Set pick-up location" onChange={(e) => setPickup(e.target.value)} />
                    <input className="form-input" defaultValue = {drop_off} placeholder="Set drop-off location" onChange={(e) => setDrop_off(e.target.value)} />
                    <DatePicker
                        selected={date}
                        onChange={handleDateChange}
                        placeholder="Date"
                        className="form-input date"
                        minDate={minDate}
                        placeholderText="Date"
                    />

                    <div className="form-input yy" onClick={() => setmobility_constrained((prev) => !prev)}>
                        Mobility Constrained

                        {mobility_constrained ?
                        <div className="radio">
                            <div className="rradio"/>
                        </div>
                        :
                        <div className="radio2">
                            <div className="rradio2"/>
                        </div>
                        }
                    </div>
                </div>
                {error && <p>{error}</p>}
                {
                    (pick_up.trim().length === 0 ||
                        drop_off.trim().length === 0 ||
                        date === null)
                        ?
                        <div className="click opa">Next</div>
                        :
                        load ?
                        <div className="click">Loading...</div>
                        :
                        <button className="click" type="submit">Next</button>
                }
            </form>
        </DIV>
    );
}

export default Select;