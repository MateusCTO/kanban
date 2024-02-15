import { NavLink } from "react-router-dom";
import "./scroll.css";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <NavLink className="button-85" to="/">
        Home
      </NavLink>
      <NavLink className="button-85" to="/">
        New Task
      </NavLink>
    </nav>
  );
}
