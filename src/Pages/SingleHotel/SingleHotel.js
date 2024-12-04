import axios from "axios";
import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth, useDate, useAlert } from "../../context";

import { FinalPrice, HotelDetails, HotelImages, Navbar, AuthModal, ProfileDropDown, SearchStayWithDate, Alert } from "../../Components";
import "./SingleHotel.css"

export const SingleHotel = () => {

    const [singleHotel, setSingleHotel] = useState({});

    const { id } = useParams();
    const { isAuthModalOpen, isDropDownModalOpen } = useAuth();
    const { isSearchModalOpen } = useDate();
    const { alert } = useAlert();
    
    useEffect(() => {
        ( async () => {
            try {
                const {data} = await axios.get(`https://travelo-backend-mz83.onrender.com/api/hotels/${id}`);
                //console.log(data);
                setSingleHotel(data);
            }catch(err) {
                console.log(err);
            }
        })()
    },[id])


    return (
        <div className="relative">
            <Navbar />
            <main className="single-hotel-page">
                { <p className="hotel-name-add">{singleHotel.name}, {singleHotel.country}</p> }
                <HotelImages singleHotel={singleHotel} />
                <div className="d-flex">
                    <HotelDetails singleHotel={singleHotel} />
                    <FinalPrice singleHotel={singleHotel} />
                </div>
            </main>
            {isSearchModalOpen && <SearchStayWithDate />}
            {isDropDownModalOpen && <ProfileDropDown />}
            {isAuthModalOpen && <AuthModal />}
            {alert.open && <Alert />}
        </div>
    )
}