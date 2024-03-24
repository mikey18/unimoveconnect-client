import styled from "styled-components";
import logo2 from "../../assets/logo2.svg"
import Component from "./Component";
import home from "../../assets/home.svg"
import layers from "../../assets/3-layers.svg"
import payment from "../../assets/payment.svg"
import barchart from "../../assets/bar-chart-2.svg"
import settings from "../../assets/settings.svg"
import user from "../../assets/user.svg"
import logout from "../../assets/logout.svg"


const DIV = styled.div`
    border: 1px solid black;
    background-color: black;
    width: 239px;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;

    .imagee{
        margin-top: 50px;
    }
    .pp{
        background-color: #344054;
        width: 90%;
        margin: auto;
        margin-top: 100px;
        padding: 15px;
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
    }
    .name{
        color: white;
    }
    .e{
        color: grey;
        width: 80px;
        overflow: hidden;
    }
`
const Nav = () => {
    // const nav = useNavigate()

    const data = [
        {
            id: 1,
            text: "Home",
            icon: home,
            path: 'home'
        },
        {
            id: 2,
            text: "My trips",
            icon: layers,
            path: 'trips'
        },

        {
            id: 3,
            text: "Payment",
            icon: payment,
            path: 'payment',
            type: 'user'
        },
        {
            id: 4,
            text: "Support",
            icon: barchart,
            path: 'support'
        }, 
        {
            id: 5,
            text: "Settings",
            icon: settings,
            path: 'settings'
        }

    ]

    const data2 = [
        {
            id: 1,
            text: "Home",
            icon: home,
            path: 'home'
        },
        {
            id: 2,
            text: "My trips",
            icon: layers,
            path: 'trips'
        },
        {
            id: 4,
            text: "Support",
            icon: barchart,
            path: 'support'
        }, 
        {
            id: 5,
            text: "Settings",
            icon: settings,
            path: 'settings'
        }

    ]

    const logou = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }

    return (
        <DIV>
            <img
                src={logo2}
                alt="imagee"
                className="imagee"
            />

            {JSON.parse(localStorage.getItem('token')).type === 'user' ?
                data.map((dat) => (
                    <Component 
                        key = {dat.id}
                        text = {dat.text}
                        icon = {dat.icon}
                        path = {dat.path}
                    />   
                ))
                :
                data2.map((dat) => (
                    <Component 
                        key = {dat.id}
                        text = {dat.text}
                        icon = {dat.icon}
                        path = {dat.path}
                    />   
                ))
            }

            <div className="pp" onClick={logou}>
                <img 
                    src={user}
                    alt="user"
                />
                <div className="fname">
                    <p className="name">{JSON.parse(localStorage.getItem('token')).firstname} {JSON.parse(localStorage.getItem('token')).lastname}</p>
                    <p className="name e">{JSON.parse(localStorage.getItem('token')).email}</p>
                </div>
                <img 
                    src={logout}
                    alt="logout"
                />
            </div>
        </DIV>
    );
}

export default Nav;