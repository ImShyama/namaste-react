import { useEffect, useState } from "react";
import { LOGO_URL } from "../utils/constants";

const Header = () => {
  const [login, setLogin] = useState("Login");
  console.log("Header render")

  useEffect(()=>{
    console.log("useEffect called")
  },[login]);

  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src={LOGO_URL}
          alt="Abstract-Chef-Cooking-Restaurant-Free-Logo"
          border="0"
        />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact US</li>
          <li>Cart</li>
        </ul>
      </div>
      <button
        onClick={() => {
          login === "Login" ? setLogin("Logout") : setLogin("Login");
        }}
      >
        {login}
      </button>
    </div>
  );
};

export default Header;
