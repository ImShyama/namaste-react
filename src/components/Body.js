import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
// import resLists from "../utils/mockData";
import useOnlineStatus from "../utils/useOnlineStatus";
import useRestaurant from "../utils/useRestaurant";

const Body = () => {
  // State Variable - Super powerful variable
  const [FilterList, setFilterList] = useState([]);
  const [search, setSearch] = useState("");

  const listOfRestaurant = useRestaurant();

  const onlineStatus = useOnlineStatus();

  if(onlineStatus === false) return <h1>Looks like you're offline! Please check your online status</h1>

  return listOfRestaurant?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="search-container">
        <div className="search">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            onClick={() => {
              const filterData = listOfRestaurant.filter((row) =>
                row.info.name.toLowerCase().includes(search.toLowerCase())
              );
              console.log(filterData);
              setFilterList(filterData);
            }}
          >
            search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            let filterList = listOfRestaurant.filter(
              (res) => res.info.avgRating > 4
            );
            console.log(filterList);
            setFilterList(filterList);
          }}
        >
          Top Rated Restaurants
        </button>
        <button onClick={()=>{
          setFilterList(listOfRestaurant);
        }}>reset</button>
      </div>
      <div className="res-container">
        {listOfRestaurant.map((restaurant) => (
          <Link to={"/restaurants/"+ restaurant.info.id} className="link_style" key={restaurant.info.id}><RestaurantCard  resData={restaurant} /></Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
