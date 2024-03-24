import styled from "styled-components";
import logo from "./assets/logo.svg";

const DIV = styled.div`
    background: rgba(222, 204, 204, 1);
    height: 300px;
    width: 100%;
    display: grid;
    justify-content: center;
    align-items: center;

    .log{
        margin: auto;
    }

`

const Footer = () => {
    return (
        <DIV>
            <img
                src={logo}
                alt="logo"
                className="log"
            />
            <p>© 2024 Unimove Connect Technology. All rights reserved.</p>
        </DIV>
    );
}

export default Footer;