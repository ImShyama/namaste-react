import { useEffect, useState } from "react";

const useRestaurant = () => {

    const [listOfRestaurant, setListOfRestaurant] = useState([]);
    const [filterList, setFilterList] = useState([]);

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData = async() => {
        
        const data = await fetch('https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.5940947&lng=85.1375645&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');

        const json = await data.json();
        setListOfRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

        setFilterList(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }

    // const response = {listOfRestaurant, filterList}
    console.log(listOfRestaurant);
    return listOfRestaurant;
}

export default useRestaurant;