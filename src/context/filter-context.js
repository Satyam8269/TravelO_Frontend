import { createContext, useContext, useReducer } from "react";
import { filterReducer } from "../reducer";


const initialValue = {
    isFilterModalOpen: false,
    priceRange: [300, 20000],
    noOfBathrooms: "Any",
    noOfBedrooms: "Any",
    noOfBeds: "Any",
    propertyType: "Any",
    travelORating: 1,
    isCancelable: true
}

const FilterContext = createContext();


const FilterProvider = ({children}) => {

    const [{isFilterModalOpen, priceRange, noOfBathrooms, noOfBedrooms, noOfBeds, propertyType, travelORating, isCancelable}, filterDispatch] = useReducer(filterReducer, initialValue)

    return (
        <FilterContext.Provider value={{isFilterModalOpen, priceRange, noOfBathrooms, noOfBedrooms, noOfBeds, propertyType, travelORating, isCancelable, filterDispatch}}>
            {children}
        </FilterContext.Provider>
    )
};


const useFilter = () => useContext(FilterContext);

export { useFilter, FilterProvider };