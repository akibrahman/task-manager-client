import { Link, NavLink } from "react-router-dom";
import Container from "./Container";

const NavBar = () => {
  return (
    <div className="bg-[#162C46]">
      <Container>
        <div className="flex items-center justify-between py-3 text-white">
          <div className="text-xl">Task Manager</div>
          <div className="flex items-center gap-6">
            <NavLink to="/">
              <p>Home</p>
            </NavLink>
            <NavLink to="/about">
              <p>About</p>
            </NavLink>
          </div>
          <Link to="/dashboard">
            <div className="flex items-center gap-3 border px-2 py-1 rounded-full">
              <img
                className="w-9 h-9 rounded-full"
                src="https://i.ibb.co/FKF7Cpg/Linkdin.jpg"
                alt=""
              />
              <p>Dashboard</p>
            </div>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
