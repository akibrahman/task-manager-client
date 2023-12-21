import { Link } from "react-router-dom";

const Registration = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex bg-gray-100 h-[90%]">
        <div className="w-1/2 bg-white p-10 border border-primary">
          <h1 className="text-2xl font-semibold mb-5">Registration</h1>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="email"
                id="email"
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
                type="email"
                id="email"
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
                type="file"
                id="email"
                className="w-full border rounded-md p-2"
                placeholder="Enter your email"
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
                id="password"
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

        <div className="w-1/2 bg-primary text-white p-10 border border-primary">
          <p className="text-lg font-semibold mb-5">Welcome Back!</p>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel
            neque justo.
          </p>
          <div className="mt-8">
            <p className="mb-2">Login with social accounts:</p>
            <div className="flex space-x-4">
              <button className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600">
                Facebook
              </button>
              <button className="bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600">
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
