import styled from "styled-components";
import large from "../assets/large.svg"

const DIV = styled.div`
    display: flex;
    width: 700px;
    height: 700px;
    
    .imagee{
    }
`

const Image = () => {
    return (  
        <DIV>
            <img 
                className="imagee"
                src={large}
                alt="large"
            />
        </DIV>
    );
}
 
export default Image;