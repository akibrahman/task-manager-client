import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const Profile = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="flex items-center justify-center h-[calc(100vh-70px)] w-full">
      <p className="text-6xl">Profile</p>
      <button
        onClick={() => logout()}
        className="bg-red-600 text-white px-3 py-1 rounded-md active:scale-90 duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
