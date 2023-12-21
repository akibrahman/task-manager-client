import { FaPlus } from "react-icons/fa";

const Tasks = () => {
  return (
    <>
      <div>
        <p className="text-lg bg-primary m-4 p-2 text-white">
          <span className="flex items-center gap-3 bg-secondary w-max py-2 px-4 rounded-md cursor-pointer add active:scale-90 duration-300 select-none">
            <FaPlus /> Add Task
          </span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mx-4">
        <div className="border border-primary min-h-52">
          <p className="text-center bg-primary text-white py-2 font-semibold">
            To-Do-List
          </p>
          <div className="p-2">
            <p className="pl-5 text-primary py-2 font-semibold border border-primary">
              Task-1
            </p>
          </div>
        </div>
        <div className="border border-primary min-h-52">
          <p className="text-center bg-primary text-white py-2 font-semibold">
            On-Going List
          </p>
        </div>
        <div className="border border-primary min-h-52">
          <p className="text-center bg-primary text-white py-2 font-semibold">
            Completed-List
          </p>
        </div>
      </div>
    </>
  );
};

export default Tasks;
