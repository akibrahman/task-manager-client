import { CgProfile } from "react-icons/cg";
import { FaArrowLeft, FaBars } from "react-icons/fa";
import { MdOutlineAddTask } from "react-icons/md";
import { NavLink } from "react-router-dom";

const SideBar = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`bg-primary border-y h-full transition-all text-white pointer-events-none w-full select-none`}
    >
      <div className="flex flex-col items-center mt-6">
        {isOpen ? (
          <FaArrowLeft
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl cursor-pointer hover:mr-2 transition-all pointer-events-auto hidden md:block"
          />
        ) : (
          <FaBars
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl cursor-pointer pointer-events-auto hidden md:block"
          />
        )}
        <div className="flex flex-col gap-3 mt-14">
          <NavLink to="/dashboard/profile">
            <div className="flex items-center gap-4 hover:bg-secondary p-3 rounded-md cursor-pointer pointer-events-auto">
              <CgProfile className="text-2xl" />
              {isOpen && <p>Profile</p>}
            </div>
          </NavLink>
          <NavLink to="/dashboard/tasks">
            <div className="flex items-center gap-4 hover:bg-secondary p-3 rounded-md cursor-pointer pointer-events-auto">
              <MdOutlineAddTask className="text-2xl" />
              {isOpen && <p>Manage Tasks</p>}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
