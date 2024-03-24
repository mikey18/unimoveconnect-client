import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const DIV = styled.div`
    .cl{
        display: flex;
        width: 70%;
        margin: auto;
        padding: 8px 12px 8px 12px;
        gap: 20px;
        margin-top: 50px;
        border-radius: 8px;
        cursor: pointer;
    }
    .cl:hover{
        background-color: #344054;
    }
    .active{
        background-color: #344054;
    }
    .text{
        color: white;
        font-size: 20px;
    }
`
const Component = ({ text, icon, path }) => {
    const nav = useNavigate()
    const location = useLocation();
    const pathnameParts = location.pathname.split('/');
    const word = pathnameParts[pathnameParts.length - 1];    
    const na = () => {
        nav(`/${path}`)
    }

    return (
        <DIV>
            <div className={path === word ? "cl active":"cl"} onClick={na}>
                <img
                    src={icon}
                    alt="icoo"
                />
                <p className="text">{text}</p>
            </div>

        </DIV>
    );
}

export default Component;