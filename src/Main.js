import styled from "styled-components";
import Nav from "./landing/Nav";
import map from "./assets/map3d.jpeg";
import expolre from "./assets/expolre.svg";
import unlock from "./assets/unlock.svg";
import secure from "./assets/secure.svg";
import assessible from "./assets/accessible.svg";
import Footer from "./Footer";

const DIV = styled.div`
    .mapp{
        top: 0;
        width: 100%;
    }
    .inner{
        position: relative;
        width: 100%;
        height: 100%;

    }
    .inn{
        position: absolute;
        display: grid;
        gap: 10px;
        margin: auto;
        top: 30%;
        left: 50px;
    }
    .map{
        width: 100%;
    }
    .imj{
        width: 100%;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .text{
        font-weight: 700;
        font-size: 70px;
        color: rgba(16, 152, 247, 1);
        font-family: 'Roboto';
    }
    .txkt{
        font-weight: 700;
        font-size: 70px;
        font-family: 'Roboto';
    }
    .third{
        font-family: 'Roboto';
        max-width: 500px;
        font-size: 20px;
    }
`

const Main = () => {
    return (
        <DIV>
            <Nav />

            <div
                className="mapp"
            >
                <div className="inner">
                    <img
                        src={map}
                        alt="map"
                        className="map"
                    />
                    <div className="inn">
                        <p className="text">Arrive in style,</p>
                        <p className="txkt">Every Time</p>
                        <p className="third">Elevate your travel standards and arrive in style with UnimoveConnect. Our commitment to excellence ensures that every ride is not just a commute but a statement of style.</p>
                    </div>
                </div>
            </div>
            <img
                src={expolre}
                alt="map"
                className="imj"
            />
            <img
                src={unlock}
                alt="map"
                className="imj"
            />
            <img
                src={secure}
                alt="map"
                className="imj"
            />
                  <img
                src={assessible}
                alt="map"
                className="imj"
            />
            <Footer />
        </DIV>
    );
}

export default Main;