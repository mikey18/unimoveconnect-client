import styled from "styled-components";
import HistoryComponent from "./HistoryComponent";

const DIV = styled.div`
    margin-top: 100px;
    .head{
        font-size: 23px;
        font-weight: bold;
    }
    .header{    
        display: flex;
        justify-content: space-between;
        gap: 20px;
        margin-top: 30px;
        width: 100%;
        border-bottom: 1px solid #9095A9;
        padding: 20px 0;
    }
    .txt{
        color: #9095A9;
        font-size: 20px;
        width: 100%;
    }
    .no{
        color: #9095A9;
        font-size: 20px;
        text-align: center;
        margin-top: 50px;
    }
`

const Previous = ({ data }) => {
    return (  
        <DIV>
            <p className="head">Previous</p>

            <div className="header">
                <p className="txt">Destination</p>
                <p className="txt">Date</p>
                <p className="txt">Time</p>
                <p className="txt">Price</p>
            </div>
            {
                data.length === 0 ?
                <p className="no">You have no trip yet</p>
                :
                data.map((dat) => (
                    <HistoryComponent key={dat.id} dat={dat}/>
                ))
            }
        </DIV>
    );
}
 
export default Previous;