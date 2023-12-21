import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../Components/SideBar";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div onClick={() => console.log("ok")} className="h-full relative flex">
      <div
        className={`${
          isOpen ? "w-[220px]" : "w-[60px]"
        }  h-full transition-all`}
      >
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      <div
        className={`${
          isOpen ? "w-[calc(100%-220px)]" : "w-[calc(100%-60px)]"
        }  h-full`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
