import { useEffect, useState, useContext } from "react";
import RestaurantCard, { withPromoted } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
// import resLists from "../utils/mockData";
import useOnlineStatus from "../utils/useOnlineStatus";
import useRestaurant from "../utils/useRestaurant";
import UserContext from "../utils/UserContext";

const Body = () => {
  // State Variable - Super powerful variable
  const [FilterList, setFilterList] = useState([]);
  const [search, setSearch] = useState("");

  const listOfRestaurant = useRestaurant();

  const onlineStatus = useOnlineStatus();

  const RestaurantCardPromoted = withPromoted(RestaurantCard);

  const { loggedInUser, setUserName } = useContext(UserContext);

  if (onlineStatus === false)
    return <h1>Looks like you're offline! Please check your online status</h1>;

  return listOfRestaurant?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="search-container flex">
        <div className="search m-4 p-4 ">
          <input
            type="text"
            className="border border-solid border-black m-2 py-1 px-2 "
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            className="px-4 py-1 bg-green-100 rounded-lg"
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
        <div className="m-4 p-4">
          <button
            className="px-4 py-1 bg-green-100 rounded-lg"
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
        </div>
        <div className="m-4 p-4">
          <button
            className="px-4 py-1  bg-gray-100 rounded-lg"
            onClick={() => {
              setFilterList(listOfRestaurant);
            }}
          >
            Reset
          </button>
        </div>
        <div className="m-4 p-4">
          <label>User Name: </label>
          <input
            type="text"
            className="border border-solid border-black m-2 py-1 px-2 rounded-md"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {listOfRestaurant.map((restaurant) => (
          <Link
            to={"/restaurants/" + restaurant.info.id}
            className="link_style"
            key={restaurant.info.id}
          >
            {restaurant.info.veg ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
