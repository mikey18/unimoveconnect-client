import styled from "styled-components";
import logo from "../assets/logo.svg"
import { Link } from "react-router-dom";


const DIV = styled.div`
    top: 0;
    padding: 20px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    position: sticky;
    z-index: 1;
    
    .right{
        display: flex;
        gap: 60px;
        align-items:  center;
    }
    .txt{
        cursor: pointer;
    }
    .link{
        text-decoration: none;
        color: black;
    }
    .buttonb{
        background-color: #1098F7;
        color: white;
        font-weight: bold;
        width: 95px;
        height: 44px;
        padding: 10px 18px 10px 18px;
        gap: 8px;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        justify-content: center;
    }
`
const Nav = () => {
    return (  
        <DIV>   
            <img 
                src={logo}
                alt="imagee"
            />

            <div className="right">
                <Link to = "/" className="link txt">Home</Link>
                {/* <Link to = "/support" className="link txt">Support</Link> */}
                <Link to = "/signup" className="link buttonb">Sign up</Link>
                <Link to = "/login" className="link buttonb">Log in</Link>
            </div>
        </DIV>
    );
}
 
export default Nav;