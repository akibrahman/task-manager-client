import { useContext, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { FaPlus, FaSpinner, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import useAxios from "../Hooks/useAxios";
import useUser from "../Hooks/useUser";
import { camelCaseToCapitalized } from "../Utils/camelCaseToCapitalized";
import { AuthContext } from "./AuthProvider";
import Loader from "./Loader";

const Tasks = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deadline, setDeadline] = useState();
  const axiosInstance = useAxios();
  const { user } = useUser();
  const { allTasks, dragLoader } = useContext(AuthContext);
  const statuses = ["toDo", "onGoing", "completed"];

  //!
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const taskAdder = async (data) => {
    data = { ...data, user: user.email };
    try {
      await axiosInstance.post("/add-task", data);
      reset();
      closeModal();
      setDeadline(null);
      // await allTasksRefetch();
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#162C46",
      color: "#fff",
      border: "none",
    },
  };

  if (!allTasks) return <Loader />;
  return (
    <>
      <Modal
        overlayClassName="Overlay"
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md"> */}
        <h2 className="text-2xl font-semibold mb-4 flex items-center justify-between">
          Add Task <FaTimes onClick={closeModal} className="cursor-pointer" />
        </h2>
        <form onSubmit={handleSubmit(taskAdder)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              className="mt-1 p-2 w-80 border rounded-md text-primary"
              placeholder="Enter Title"
            />
            {errors.title?.type === "required" && (
              <p className="text-red-600 mt-1">First name is required</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              className="mt-1 p-2 w-80 border rounded-md text-primary"
              rows="3"
              placeholder="Enter Description"
            ></textarea>
            {errors.description?.type === "required" && (
              <p className="text-red-600">First name is required</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="deadline" className="block text-sm font-medium">
              Deadline
            </label>
            <input
              {...register("deadline", { required: true })}
              type="date"
              format="dd-mm-yyyy"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-1 p-2 w-80 border rounded-md text-primary"
            />
            {errors.deadline?.type === "required" && (
              <p className="text-red-600">First name is required</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block text-sm font-medium">
              Priority
            </label>
            <select
              {...register("priority", { required: true })}
              // value={priority}
              // onChange={(e) => setPriority(e.target.value)}
              className="mt-1 p-2 w-80 border rounded-md text-primary"
            >
              <option value="" disabled>
                Select Priority
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority?.type === "required" && (
              <p className="text-red-600">First name is required</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </form>
        {/* </div> */}
      </Modal>
      <div>
        <p className="text-lg bg-primary m-4 p-2 text-white flex items-center gap-4">
          {user && (
            <span
              onClick={openModal}
              className="flex items-center gap-3 bg-secondary w-max py-2 px-4 rounded-md cursor-pointer add active:scale-90 duration-300 select-none"
            >
              <FaPlus /> Add Task
            </span>
          )}
          {dragLoader && <FaSpinner className={`animate-spin`} />}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mx-4 mb-4">
        {statuses.map((status, i) => (
          <SingleBlock
            axiosInstance={axiosInstance}
            status={status}
            // refetch={allTasksRefetch}
            tasks={allTasks}
            key={i}
          />
        ))}
      </div>
    </>
  );
};
//! Single Block -----------------------
const SingleBlock = ({ status, tasks, setLoading }) => {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="">
          <p
            className={`text-center text-white py-2 font-semibold flex items-center justify-center gap-3 ${
              status == "toDo"
                ? "bg-green-600"
                : status == "onGoing"
                ? "bg-yellow-600"
                : "bg-blue-600"
            }`}
          >
            {camelCaseToCapitalized(status)}
            <span>{tasks.filter((task) => task.status == status).length}</span>
          </p>
          {/*  */}
          <div className="border border-primary border-t-0 overflow-y-scroll h-[380px]">
            {tasks.filter((task) => task.status == status).length > 0 ? (
              tasks
                .filter((task) => task.status == status)
                .map(
                  (task, i) =>
                    task._id && (
                      <SingleTask
                        setLoading={setLoading}
                        key={i}
                        index={i}
                        task={task}
                      />
                    )
                )
            ) : (
              <p className="pl-5 text-primary py-2 font-semibold">
                No Tasks Here
              </p>
            )}
            {provided.placeholder}
          </div>
          {/*  */}
        </div>
      )}
    </Droppable>
  );
};
//! Single Task -----------------------
const SingleTask = ({ task, index }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-2 cursor-grab`}
        >
          <p className="pl-5 text-primary py-2 font-semibold border border-primary">
            {task.title}+{task._id}
          </p>
        </div>
      )}
    </Draggable>
  );
};

export default Tasks;
