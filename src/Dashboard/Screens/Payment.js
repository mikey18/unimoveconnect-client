import styled from "styled-components";
import Nav from "../Nav/Nav";
import creditcard from "../../assets/creditcard.svg"

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
    .gradient{
        background: linear-gradient(2deg, white, lightgrey);
        height: 200px;
        width: 100%;
        padding: 30px;
        border-radius: 20px;
    }
    .head{
        font-weight: bold;
        color: #9095A9;
    }
    .price{
        font-weight: bold;
        color: #9095A9;
        font-size: 50px;
    }
    .imajj{
        margin-top: 50px;
    }
`
const Payment = () => {
    return (  
        <DIV>
            <Nav />
            
            <div className="container">
                <p className="headd">Payment</p>

                <div className="gradient">
                    <p className="head">UnimoveConnect Balance</p>
                    <p className="price">₦{(JSON.parse(localStorage.getItem('token')).wallet).toLocaleString()}</p>
                </div>

                <img 
                    src={creditcard}
                    alt="creditcard"
                    className="imajj"
                />
            </div>
        </DIV>
    );
}
 
export default Payment;