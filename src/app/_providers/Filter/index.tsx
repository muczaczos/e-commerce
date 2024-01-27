"use client"  //when you wanna use many states 

import { createContext, useContext, useState } from "react";

export const INITIAL_FILTER_DATA = {
    categoryFilters: [],
    setCategoryFilters: () = [],
    sort: '',
    setSort: () => '',
}

const FilterContext = createContext(INITIAL_FILTER_DATA);

export const FilterProider = ({children}: { children: React.
ReactNode}) => {
    const [categoryFilters, setCategoryFilters] = useState([]);

    const [sort, setSort] = useState('-createAt')
    return (
        <FilterContext.Provider value={{
            categoryFilters,
            setCategoryFilters,
            sort,
            setSort
        }}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = () => useContext(FilterContext)