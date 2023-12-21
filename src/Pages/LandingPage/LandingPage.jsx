import { SiRundeck } from "react-icons/si";
import Container from "../../Components/Container";

const LandingPage = () => {
  return (
    <Container>
      <div className="flex items-center justify-center h-full">
        <div className="w-1/2 bg-purple500">
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
          <button className="mt-5 bg-primary text-white px-4 py-2 rounded-md font-medium border border-transparent flex items-center gap-3 hover:gap-6 hover:border-primary hover:bg-transparent hover:text-primary hover:scale-105 active:scale-90 ease-in-out duration-300 ">
            Get Started <SiRundeck />
          </button>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center gap-6">
          <img className="w-[170px]" src="/b1.gif" alt="" />
          <div className="flex gap-6">
            <img src="/b2.gif" alt="" />
            <img src="/b3.gif" alt="" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LandingPage;
