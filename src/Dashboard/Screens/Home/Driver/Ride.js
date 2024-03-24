import styled from "styled-components";
import bigcar from "../../../../assets/big_car.svg"
import location from "../../../../assets/location.svg"
import arrowright from "../../../../assets/arrow-right.svg"
import fro from "../../../../assets/from.svg"
import Component from "../../Home/Book/Component";

const DIV = styled.div`
    .head{
        font-size: 23px;
        font-weight: bold;
    }
    .all{
        display: flex;
        width: 800px;
        margin-bottom: 50px;
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
        margin-left: 20px;
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
        margin-left: 20px;
    }
    .noo{
        width: 100%;
        display: grid;
        justify-content: center;
        gap: 20px;
    }
    .info{
        display: grid;
        gap: 15px;
    }
    .p{
        font-size: 20px;
        color: #9095A9;
    }
`

const Ride = ({ data }) => {
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
        // {
        //     id: 2,
        //     icon: walet,
        //     text: `₦${JSON.parse(localStorage.getItem('token')).wallet.toLocaleString()}`
        // }
    ]


    return (
        <DIV>
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
                    <div>
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
                </div>

                <div className="info">
                    <p className="head">Student Details</p>
                    <p className="p">Name: {data.user.firstname} {data.user.lastname}</p>
                    <p className="p">Matric Number: {data.user.matric_no}</p>
                    <p className="p">Mobility Constrained: {data.mobility_constrained === true ? 'Yes':'No'}</p>
                </div>
            </div>
        </DIV>
    );
}

export default Ride;