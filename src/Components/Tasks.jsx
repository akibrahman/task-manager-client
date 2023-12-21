import { useDrag, useDrop } from "react-dnd";
import { FaPlus } from "react-icons/fa";
import { camelCaseToCapitalized } from "../Utils/camelCaseToCapitalized";

const Tasks = () => {
  const statuses = ["toDo", "onGoing", "completed"];
  const tasks = [
    {
      id: 1,
      name: "Gosol",
      status: "completed",
    },
    {
      id: 2,
      name: "Namaj",
      status: "completed",
    },
    {
      id: 3,
      name: "Lunch",
      status: "onGoing",
    },
    {
      id: 4,
      name: "Rest",
      status: "onGoing",
    },
    {
      id: 5,
      name: "Work",
      status: "toDo",
    },
    {
      id: 5,
      name: "Work",
      status: "toDo",
    },
    {
      id: 5,
      name: "Work",
      status: "toDo",
    },
    {
      id: 5,
      name: "Work",
      status: "toDo",
    },
    {
      id: 5,
      name: "Work",
      status: "toDo",
    },
    {
      id: 5,
      name: "Work",
      status: "toDo",
    },
    {
      id: 5,
      name: "Work",
      status: "toDo",
    },
    {
      id: 5,
      name: "Work",
      status: "toDo",
    },
    {
      id: 6,
      name: "Walking",
      status: "toDo",
    },
  ];
  return (
    <>
      <div>
        <p className="text-lg bg-primary m-4 p-2 text-white">
          <span className="flex items-center gap-3 bg-secondary w-max py-2 px-4 rounded-md cursor-pointer add active:scale-90 duration-300 select-none">
            <FaPlus /> Add Task
          </span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mx-4 mb-4">
        {statuses.map((status, i) => (
          <SingleBlock status={status} tasks={tasks} key={i} />
        ))}
      </div>
    </>
  );
};
//! Single Block -----------------------
const SingleBlock = ({ status, tasks }) => {
  const [, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  //!
  const addItemToSection = (id) => {
    console.log("Dropped - ", id, status);
  };
  return (
    <div ref={drop} className="">
      <p
        className={`text-center text-white py-2 font-semibold ${
          status == "toDo"
            ? "bg-green-600"
            : status == "onGoing"
            ? "bg-yellow-600"
            : "bg-blue-600"
        }`}
      >
        {camelCaseToCapitalized(status)}
      </p>
      {/*  */}
      <div className="border border-primary border-t-0 overflow-y-scroll h-[380px]">
        {tasks
          .filter((t) => t.status == status)
          .map((task, i) => (
            <SingleTask key={i} task={task} />
          ))}
      </div>
      {/*  */}
    </div>
  );
};
//! Single Task -----------------------
const SingleTask = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  //   console.log(isDragging);
  return (
    <div
      ref={drag}
      className={`p-2 cursor-grab ${isDragging ? "opacity-25" : "opacity-100"}`}
    >
      <p className="pl-5 text-primary py-2 font-semibold border border-primary">
        Task - {task.name}
      </p>
    </div>
  );
};

export default Tasks;
