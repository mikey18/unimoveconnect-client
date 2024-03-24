import styled from "styled-components";

const DIV = styled.div`
    .compo{
        width: 100%;
        padding: 15px;
        border-radius: 5px;
        border: 1px solid #9095A9;
        font-size: 20px;
        font-weight: bold;
        display: flex;
        justify-content: left;
        gap: 30px;
        align-items: center;
    }
`

const Component = ({icon, text}) => {
    return (
        <DIV>
            <div className="compo">
                <img
                    src={icon}
                    alt="car"
                />
                <p>
                    {text}
                </p>
            </div>

        </DIV>
    );
}

export default Component;