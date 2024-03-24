import styled from "styled-components";

const DIV = styled.div`
    .header2{    
        display: flex;
        justify-content: space-between;
        gap: 20px;
        width: 100%;
        border-bottom: 1px solid #9095A9;
        padding: 20px 0;
    }
    .txt2{
        font-size: 20px;
        width: 100%;
    }
`

const HistoryComponent = ({ dat }) => {
    const date = new Date(dat.date);
    const time = new Date(dat.time);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;

    return (  
        <DIV>
            <div className="header2">
                <p className="txt2">{dat.to_location}</p>
                <p className="txt">{formattedDate}</p>
                <p className="txt">{formattedTime}</p>
                <p className="txt">₦{dat.price.toLocaleString()}</p>
            </div>
        </DIV>
    );
}
 
export default HistoryComponent;