import { useContext } from "react";
import { SiRundeck } from "react-icons/si";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Components/AuthProvider";

const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const userTypes = [
    {
      title: "Developers",
      description: "Efficiently manage and prioritize coding tasks.",
      benefits: [
        "Organize sprints and development cycles.",
        "Track and prioritize bugs and feature requests.",
        "Collaborate with team members on project tasks.",
      ],
    },
    {
      title: "Corporate Professionals",
      description: "Organize and track projects for business needs.",
      benefits: [
        "Manage project timelines and deadlines.",
        "Coordinate tasks with team members.",
        "Track and prioritize business-related activities.",
      ],
    },
    {
      title: "Bankers",
      description: "Manage financial tasks and deadlines effectively.",
      benefits: [
        "Track financial transactions and deadlines.",
        "Organize financial reports and statements.",
        "Collaborate with financial team members.",
      ],
    },
    // Add more user types as needed
  ];
  return (
    <div className="">
      <div className="w-[90%] mx-auto h-[calc(100vh-70px)] flex flex-col md:flex-row items-center justify-between md:justify-center my-5 md:my-0">
        <div className="w-full md:w-1/2 bg-purple500">
          <p className="text-5xl font-semibold">
            Task Management <br /> <span className="text-primary">System</span>
          </p>
          <p className="mt-5">
            EfficientTask, a React-powered Task Management System, offers
            intuitive task creation, dynamic categorization, and seamless
            collaboration. Customize categories, delve into task details, and
            stay organized with a responsive design. Elevate your productivity
            effortlessly.
          </p>
          <Link to={`${user ? "/dashboard/profile" : "/login"}`}>
            <button className="mt-5 bg-primary text-white px-4 py-2 rounded-md font-medium border border-transparent flex items-center gap-3 hover:gap-6 hover:border-primary hover:bg-transparent hover:text-primary hover:scale-105 active:scale-90 ease-in-out duration-300 ">
              Let&apos;s Explore <SiRundeck />
            </button>
          </Link>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center gap-6">
          <img className="w-[170px]" src="/b1.gif" alt="" />
          <div className="flex gap-6">
            <img src="/b2.gif" alt="" />
            <img src="/b3.gif" alt="" />
          </div>
        </div>
      </div>
      <section className="bg-gray-100 py-12 px-3 md:px-0">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-8">Who Can Benefit?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userTypes.map((userType, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">{userType.title}</h3>
                <p className="text-gray-700 mb-4">{userType.description}</p>
                <ul className="list-disc pl-6">
                  {userType.benefits.map((benefit, i) => (
                    <li key={i} className="text-gray-700">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
