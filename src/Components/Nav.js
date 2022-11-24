import React, { useEffect, useState } from "react";
import LOGO from "./NetflixLOGO.png";
import user from "./user.png";
import "./Nav.css";

function Nav() {
  const [show, handleshow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleshow(true);
      } else {
        handleshow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img src={LOGO} alt="Netflix_logo" className="logo" />
      <img src={user} alt="user_logo" className="profile" />
    </div>
  );
}

export default Nav;
