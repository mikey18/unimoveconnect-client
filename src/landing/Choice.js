import styled from "styled-components";

const DIV = styled.div`
    display: flex;
    margin: auto;
    gap: 50px;

    .ll{
        border: 1px solid lightgrey;
        padding: 20px;
        color: grey;
        cursor: pointer;
    }
    .active{
        background-color: #1098F7;
        color: white;
        border: 1px solid transparent;
    }
`

const Choice = ({ choice, setChoice }) => {
    return (  
        <DIV>
            <p className={choice === 'student' ? "ll active":"ll"} onClick={() => setChoice('student')}>Student</p>
            <p className={choice === 'driver' ? "ll active":"ll"} onClick={() => setChoice('driver')}>Driver</p>
        </DIV>
    );
}
 
export default Choice;