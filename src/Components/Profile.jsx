import { motion } from "framer-motion";
import { useContext } from "react";
import { toast } from "react-toastify";
import useUser from "../Hooks/useUser";
import { AuthContext } from "./AuthProvider";
import Loader from "./Loader";

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const { user } = useUser();
  if (!user) return <Loader />;
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-70px)] w-full">
      <p className="text-6xl mb-14">Profile</p>
      <div className="flex flex-col lg:flex-row items-center gap-10">
        <motion.img
          initial={{ zoom: 0 }}
          animate={{ zoom: 1 }}
          transition={{ type: "spring" }}
          src={user?.photo}
          className="w-[300px] h-[300px] rounded-full"
          alt=""
        />
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          transition={{ type: "spring" }}
          className="space-y-6"
        >
          <p className="font-bold">
            Name:{" "}
            <span className="font-medium text-white bg-primary px-5 py-2 rounded-md">
              {user?.name}
            </span>
          </p>
          <p className="font-bold">
            E-mail:{" "}
            <span className="font-medium text-white bg-primary px-5 py-2 rounded-md">
              {user?.email}
            </span>
          </p>
          <button
            onClick={async () => {
              await logout();
              toast.success("Logout");
            }}
            className="bg-red-600 text-white px-3 py-1 rounded-md active:scale-90 duration-300"
          >
            Logout
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
