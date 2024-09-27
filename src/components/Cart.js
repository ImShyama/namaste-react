import { useDispatch, useSelector } from "react-redux";
import { clearcart } from "../utils/cardSlice";
import ItemList from "./ItemList";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    // Clear the cart
    dispatch(clearcart());
  }

  return (
    <>
      {" "}
      <div className="flex justify-center items-center mt-[50px] font-bold text-xl">
        <h2>Cart</h2>
      </div>
      <div className="px-[30%] text-center">
      <button className="bg-gray-600 text-white p-2 m-2 rounded-md items-center"
      onClick={handleClearCart}
      >clear cart</button>
      {cartItems.length == 0 && <h2> Cart is empty ADD Items to the cart</h2>}
        <ItemList items={cartItems} />
      </div>
    </>
  );
};

export default Cart;
