import "./Filter.css";
import { FreeCancel, PriceRange, PropertyTypes, Ratings, RoomsAndBeds } from "./index";
import { useFilter } from "../../context"; 

export const Filter = () => {
  
  const { filterDispatch } = useFilter();

  const handleFiterModalCloseClick = () => {
    filterDispatch({
      type: "SHOW_FILTER_MODAL"
    });
  };

  const handleClearFilterClick = () => {
    filterDispatch({
      type: "CLEAR_ALL"
    })
  }

  return (
    <div className="filter-modal">
        <div className="filter-page shadow">
            <div className="d-flex align-center justify-space-between">
                <span className="filter-label">Filter</span>
                <button className="button btn-close cursor-pointer d-flex align-center justify-center">
                    <span className="material-icons-outlined" onClick={handleFiterModalCloseClick}>close</span>
                </button>
            </div>
            <PriceRange />
            <RoomsAndBeds />
            <PropertyTypes />
            <Ratings />
            <FreeCancel />
            <div className="d-flex align-center justify-space-between">
              <button className="button cursor btn-link-primary" onClick={handleClearFilterClick}>ClearAll</button>
              <button className="button cursor btn-primary btn-apply" onClick={handleFiterModalCloseClick}>Apply</button>
            </div>
        </div>
    </div>
  )
};
