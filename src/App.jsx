import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <NavBar />
        <Outlet />
        <Footer />
      </>
    </DndProvider>
  );
}

export default App;
