import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <NavBar />
        <div className="h-[calc(100vh-70px)] min-h-[calc(100vh-70px)]">
          <Outlet />
        </div>
      </>
    </DndProvider>
  );
}

export default App;
