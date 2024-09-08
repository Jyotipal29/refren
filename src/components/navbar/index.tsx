import Style from "./navbar.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import MenuV from "../../assets/menu-v.svg";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className={Style.container}>
      <div className={Style.wrapper}>
        <div className={Style.logo}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Rick & Morty
          </Link>
        </div>
        <ul className={Style.nav_list}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <li className={Style.nav_items}>Characters</li>
          </Link>
          <Link
            to="/location"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <li className={Style.nav_items}>Locations</li>
          </Link>

          <Link
            to="/episode"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <li className={Style.nav_items}>Episodes</li>
          </Link>
        </ul>
        <div className={Style.menu_container}>
          <img src={MenuV} className={Style.menu} onClick={toggleMenu} />
        </div>

        {isMenuOpen && (
          <ul className={Style.menu_drop}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              <li className={Style.menu_pill}>Characters</li>
            </Link>
            <Link
              to="/location"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <li className={Style.menu_pill}>Locations</li>
            </Link>

            <Link
              to="/episode"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <li className={Style.menu_pill}>Episodes</li>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
