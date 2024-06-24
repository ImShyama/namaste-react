import { useEffect, useState } from "react";
import { MENUITEM_URL } from "../utils/constants";

const useRestaurantMenu = (resId) => {

    const [resInfo, setResInfo] = useState(null);
    // fetchdata
    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async() => {
        const data = await fetch(MENUITEM_URL + resId)
        const json = await data.json();
        setResInfo(json.data);
    }

    return resInfo;
}

export default useRestaurantMenu;