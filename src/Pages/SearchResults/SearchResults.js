import { Fragment, useEffect, useState } from "react";
import { HotelCard, Navbar, Alert } from "../../Components";
import { useDate, useCategory, useAlert } from "../../context";
import axios from "axios";

export const SearchResults = () => {
  const { destination } = useDate();
  const { hotelCategory } = useCategory();
  const [hotels, setHotels] = useState([]);
  const { alert } = useAlert();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://travelo-backend-mz83.onrender.com/api/hotels?category=${hotelCategory}`
        );
        //console.log(data);
        setHotels(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [hotelCategory, destination]);

  const filteredSearchResults = hotels.filter(
    ({ city, address, state }) =>
      address.toLowerCase() === destination.toLowerCase() ||
      city.toLowerCase() === destination.toLowerCase() ||
      state.toLowerCase() === destination.toLowerCase()
  );

  return (
    <Fragment>
      <Navbar />
      <section className="main d-flex align-center gap-larger">
        {filteredSearchResults ? (
          filteredSearchResults.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))
        ) : (
          <h3>Nothing Found</h3>
        )}
      </section>
      {alert.open && <Alert />}
    </Fragment>
  );
};
