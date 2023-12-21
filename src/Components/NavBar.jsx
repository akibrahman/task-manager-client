import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Container from "./Container";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-[#162C46]">
      <Container>
        <div className="flex items-center justify-between py-3 text-white">
          <div className="text-xl">Task Manager</div>
          <div className="flex items-center gap-6">
            <NavLink to="/">
              <p>Home </p>
            </NavLink>
            <NavLink to="/about">
              <p>About</p>
            </NavLink>
          </div>
          {user ? (
            <Link to="/dashboard/profile">
              <div className="flex items-center gap-3 border px-2 py-1 rounded-full">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://i.ibb.co/FKF7Cpg/Linkdin.jpg"
                  alt=""
                />
                <p>Dashboard</p>
              </div>
            </Link>
          ) : (
            <Link to="/login">
              <button className="bg-secondary px-5 py-2 rounded-md font-semibold hover:text-secondary hover:bg-white duration-300 ease-in-out active:scale-90">
                Login
              </button>
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
