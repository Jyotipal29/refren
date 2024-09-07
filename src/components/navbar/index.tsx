import Style from "./navbar.module.css";
import { Link } from "react-router-dom";
const Navbar = () => {
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
      </div>
    </div>
  );
};

export default Navbar;
