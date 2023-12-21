import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <div className="h-[calc(100vh-70px)] min-h-[calc(100vh-70px)]">
        <Outlet />
      </div>
    </>
  );
}

export default App;
