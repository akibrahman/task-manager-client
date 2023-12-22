import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { imageUploader } from "../Utils/imageUploader";
import { AuthContext } from "./AuthProvider";
import Social from "./Social";

const Registration = () => {
  const navigate = useNavigate();
  const { registration, update } = useContext(AuthContext);
  const [photoFile, setPhotoFile] = useState(null);

  const handleRegistration = async (event) => {
    event.preventDefault();
    const form = event.target;
    if (!photoFile) {
      alert("Photo is Required");
      return;
    }
    try {
      const url = await imageUploader(photoFile);
      await registration(form.email.value, form.password.value);
      await update(form.name.value, url.display_url);
      navigate("/dashboard/profile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col md:flex-row bg-gray-100 h-[90%]">
        <div className="w-full md:w-1/2 bg-white p-10 border border-primary">
          <h1 className="text-2xl font-semibold mb-5">Registration</h1>
          <form onSubmit={handleRegistration}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                required
                type="text"
                name="name"
                className="w-full border rounded-md p-2"
                placeholder="Enter your Name"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                className="w-full border rounded-md p-2"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Photo
              </label>
              <input
                required
                onChange={(e) => setPhotoFile(e.target.files[0])}
                accept=".jpg, .jpeg, .png, .webp"
                type="file"
                name="file"
                className="w-full border rounded-md p-2"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full border rounded-md p-2"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-white font-semibold rounded-md py-2 px-4 hover:bg-secondary active:scale-90 duration-300"
            >
              Register
            </button>
          </form>
          <p className="mt-4">
            or{" "}
            <Link className="font-bold" to="/login">
              Login
            </Link>
          </p>
        </div>

        <div className="w-full md:w-1/2 bg-primary text-white p-10 border border-primary">
          <p className="text-lg font-semibold mb-5">Welcome!</p>
          <p className="">
            We are very glad to know that we are going to join with a new member
          </p>
          <Social />
        </div>
      </div>
    </div>
  );
};

export default Registration;
