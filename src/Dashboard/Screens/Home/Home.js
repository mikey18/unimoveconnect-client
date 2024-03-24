import styled from "styled-components";
import Nav from "../../Nav/Nav";
import Select from "./Select";
import { useState } from "react";
import ChooseRide from "./ChooseRide/ChooseRide";
import Book from "./Book/Book";
import DriverSearchrides from "./Driver/DriverSearchrides";

const DIV = styled.div`

`
const Home = () => {
    const [page, setPage] = useState(1)

    const [pick_up, setPickup] = useState('')
    const [drop_off, setDrop_off] = useState('')
    const [date, setDate] = useState(null)
    const [mobility_constrained, setmobility_constrained] = useState(false)


    const [ride_options, setride_options] = useState(null)
    const [selected, setSelected] = useState(null)

    const [active, setActive] = useState(null)

    const [price_and_driver, setprice_and_driver] = useState(null)

    return (
        <DIV>
            <Nav />
            {
                JSON.parse(localStorage.getItem('token')).type === 'user' ?
                    <>
                        {page === 1 && <Select
                            pick_up={pick_up}
                            drop_off={drop_off}
                            date={date}
                            setPickup={setPickup}
                            setDrop_off={setDrop_off}
                            setDate={setDate}
                            setPage={setPage}
                            setride_options={setride_options}
                            mobility_constrained={mobility_constrained}
                            setmobility_constrained={setmobility_constrained}
                        />}
                        {page === 2 && <ChooseRide
                            pick_up={pick_up}
                            drop_off={drop_off}
                            ride_options={ride_options}
                            selected={selected}
                            setSelected={setSelected}
                            setPage={setPage}
                            active={active}
                            setActive={setActive}
                            setprice_and_driver={setprice_and_driver}
                            date={date}
                            mobility_constrained={mobility_constrained}
                        />}
                        {page === 3 && <Book
                            pick_up={pick_up}
                            drop_off={drop_off}
                            setPage={setPage}
                            price_and_driver={price_and_driver}
                        />}
                    </>
                    :
                    <DriverSearchrides />
            }

        </DIV>
    );
}

export default Home;