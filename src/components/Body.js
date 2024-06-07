import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import resLists from "../utils/mockData";

const Body = () => {

  // State Variable - Super powerful variable
  const [listOfRestaurant, setListOfRestaurant] = useState(resLists);

  
  return (
    <div className="body">
      <div className="search-container">
        <button
          className="filter-btn"
          onClick={() => {
            let filterList = listOfRestaurant.filter((res)=> res.info.avgRating > 4)
            console.log(filterList)
            setListOfRestaurant(filterList)
          }}
        >Top Rated Restaurants</button>
      </div>
      <div className="res-container">
        {listOfRestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
