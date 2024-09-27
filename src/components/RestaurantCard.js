import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
  const { resData } = props;
  const {loggedInUser} = useContext(UserContext);
  const { cloudinaryImageId, name, cuisines, avgRating, sla } = resData?.info;
  return (
    <div className="m-4 p-2 w-[250px] bg-gray-100 hover:bg-gray-200 rounded-lg">
      <img
        className="rounded-lg w-[100%] h-[200px]"
        src={CDN_URL + cloudinaryImageId}
        alt="IMG-1851-min-rzy6-GLyfz-C"
        border="0"
      ></img>
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{sla.slaString}</h4>
      <h4>User: {loggedInUser}</h4>
    </div>
  );
};

export const withPromoted = (RestaurantCard) => {
  return (props) => {
    return(
      <div>
        <label className="absolute ml-6 mt-2 px-5 py-1 bg-green-400 text-white rounded-lg font-bold">Veg</label>
        <RestaurantCard {...props}/>
      </div>
    )
  }
}

export default RestaurantCard;
