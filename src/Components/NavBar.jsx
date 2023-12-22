import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Container from "./Container";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-[#162C46]">
      <Container>
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between py-3 text-white">
          <div className="text-xl w-max md:w-1/2">Task Manager</div>
          <div className="w-full md:w-1/2 flex items-center md:justify-between justify-center gap-10 md:gap-0">
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
                    src={user.photoURL}
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
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
