import styled from "styled-components";
import car from "../../../../assets/small_car.svg"

const DIV = styled.div`
    .compo{
        width: 100%;
        padding: 15px;
        border-radius: 5px;
        border: 1px solid #9095A9;
        color: #344054;
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #9095A9;
        cursor: pointer;
    }
    .compo:hover{
        border: 1px solid #1098F7;

        p{
            color: #1098F7;
        }
    }
    .active{
        border: 1px solid #1098F7;

        p{
            color: #1098F7;
        }
    }

`

const Component = ({name,
    id,
    seats,
    bags,
    range,
    active,
    setActive}) => {
    return (
        <DIV onClick={() => setActive(id)}>
            <div className={active === id ? "compo active":"compo"}>
                <img
                    src={car}
                    alt="car"
                />
                <div>
                    <p>{name}</p>
                    <p>{seats} seat, {bags} bags</p>
                </div>
                <p>
                    ₦{range}
                </p>
            </div>

        </DIV>
    );
}

export default Component;