import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const { resData } = props;
    const {cloudinaryImageId,name,cuisines,avgRating,sla} = resData?.info;
    return (
        <div className="restaurant-card">
            <img className="card-image" src={CDN_URL+cloudinaryImageId }alt="IMG-1851-min-rzy6-GLyfz-C" border="0"></img>
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{sla.slaString}</h4>
        </div>
    )
}

export default RestaurantCard;