import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const NotFound = ({ auth }) => {
    const nav = useNavigate()

    useEffect(() => {
        if(auth){
            nav('/home')
        }
        if(auth === false){
            nav('/')
        }
    })

}
 
export default NotFound;