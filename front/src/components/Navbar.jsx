/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { GoSun, GoMoon } from "react-icons/go";
import "../App.css";

function Navbar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }

  return (
    <div>
      <nav className=" content navbar d-md-flex fixed-top navbar-expand-lg bg-body-tertiary header justify-content-between px-3">
      <img  src="/dashboard.png" className="fs-4" height="100px" width="100px"/>
          <p className="fs-2 align-item-center">
            Dashboard
          </p>
          <div className="d-flex mb-2">
          
          <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success align-item-center" type="submit">Search</button>
      </form>
      <button className="btn ms-2 align-item-center" onClick={toggleTheme}>
            {theme === "light" ? <GoMoon style={{ fontSize: "24px" }} /> : <GoSun style={{ fontSize: "24px" }} />}
          </button>
      </div>
      </nav>
    </div>
  );
}

export default Navbar;
