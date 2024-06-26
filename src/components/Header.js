import { useEffect, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [login, setLogin] = useState("Login");

  const onlineStatus = useOnlineStatus();

  return (
    <div className="flex justify-between bg-pink-100 shadow-lg m-2 p-2">
      <div className="flex item-center">
        <img
          className="w-20"
          src={LOGO_URL}
        />
      </div>
      <div className="flex item-center">
        <ul className="flex justify-between p-4 m-4">
          <li className="px-4">Online Status: {onlineStatus ? '✅' : '🔴'}</li>
          <li className="px-4"><Link to={"/"}>Home</Link></li>
          <li className="px-4"><Link to={"/about"}>About Us</Link></li>
          <li className="px-4"><Link to={"/contact"}>Contact US</Link></li>
          <li className="px-4"><Link to={"/grocery"}>Grocery</Link></li>
          <li className="px-4"><Link >Cart</Link></li>
        </ul>
      </div>
      <div className="flex m-4 p-4">
      <button
      className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2"
        onClick={() => {
          login === "Login" ? setLogin("Logout") : setLogin("Login");
        }}
      >
        {login}
      </button>
      </div>
      
    </div>
  );
};

export default Header;
