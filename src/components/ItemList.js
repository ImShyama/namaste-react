import { useDispatch } from "react-redux";
import { addItem } from "../utils/cardSlice";
import { CDN_URL } from "../utils/constants";

const ItemList = ({ items }) => {

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // dispatch an action
    dispatch(addItem(item));
  }

  return (
    <div>
      {items.map((item) => (
        <div key={item.card.info.id} className="p-2 m-2 border-gray-200 border-b-[1px] text-left flex justify-between">
            <div>
            <div className="flex gap-4 py-2">
            <span className="text-lg">{item.card.info.name}</span>
            <span>₹ {item.card.info.price / 100}</span>
          </div>
          <p className="text-xs">{item.card.info.description}</p>
            </div>
            <div className="text-center">
                <img className="w-[150px] rounded-lg" src={CDN_URL+item.card.info.imageId} alt={item.card.info.name} />
                
                <button className="bg-white text-green-600 font-bold rounded-lg relative px-4 py-1 mt-[-20px] mx-auto shadow-md"
                onClick={() => handleAddItem(item)}
                >ADD</button>
            </div>
          
        </div>
      ))}
    </div>
  );
};

export default ItemList;
