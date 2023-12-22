import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Social = () => {
  const { google } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      await google();
      navigate("/dashboard/profile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-8">
      <p className="mb-2">Join social accounts:</p>
      <div className="flex space-x-4">
        {/* <button className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600">
          Facebook
        </button> */}
        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600 flex items-center gap-2 active:scale-90 duration-300"
        >
          <FaGoogle className="text-xl" />
          Google
        </button>
      </div>
    </div>
  );
};

export default Social;
