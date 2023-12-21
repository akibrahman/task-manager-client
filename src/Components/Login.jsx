import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(event.target.email.value, event.target.password.value);
      navigate("/dashboard/profile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex bg-gray-100 h-[90%]">
        <div className="w-1/2 bg-white p-10 border border-primary">
          <h1 className="text-2xl font-semibold mb-5">Login</h1>
          <form onSubmit={handleLogin}>
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
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                required
                type="password"
                name="password"
                className="w-full border rounded-md p-2"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white font-semibold rounded-md py-2 px-4 hover:bg-secondary active:scale-90 duration-300"
            >
              Login
            </button>
          </form>
          <p className="mt-4">
            or{" "}
            <Link className="font-bold" to="/registration">
              Register
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

export default Login;
