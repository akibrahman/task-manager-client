import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useForm } from "react-hook-form";
import { FaPlus, FaSpinner, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import useAxios from "../Hooks/useAxios";
import { camelCaseToCapitalized } from "../Utils/camelCaseToCapitalized";
import Loader from "./Loader";

const Tasks = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deadline, setDeadline] = useState();
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();
  const statuses = ["toDo", "onGoing", "completed"];

  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["toDos"],
    queryFn: async () => {
      const data = await axiosInstance.get("/get-tasks");
      return data.data;
    },
  });

  //!
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const taskAdder = async (data) => {
    console.log(data);
    try {
      await axiosInstance.post("/add-task", data);
      reset();
      closeModal();
      setDeadline(null);
      await refetch();
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

  if (isLoading) return <Loader />;
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
          <span
            onClick={openModal}
            className="flex items-center gap-3 bg-secondary w-max py-2 px-4 rounded-md cursor-pointer add active:scale-90 duration-300 select-none"
          >
            <FaPlus /> Add Task
          </span>
          {loading && <FaSpinner className={`animate-spin`} />}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mx-4 mb-4">
        {statuses.map((status, i) => (
          <SingleBlock
            axiosInstance={axiosInstance}
            setLoading={setLoading}
            status={status}
            refetch={refetch}
            tasks={tasks}
            key={i}
          />
        ))}
      </div>
    </>
  );
};
//! Single Block -----------------------
const SingleBlock = ({ status, tasks, setLoading, axiosInstance, refetch }) => {
  const [, drop] = useDrop(() => ({
    accept: "TASK",
    drop: async (item) => await addTaskToSection(item.id, status),
    // drop: (item) => console.log({ ...item, status }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  //!
  const addTaskToSection = async (id, status) => {
    console.log("Dropped - ", id, status);
    await axiosInstance.put(`/change-task-status?id=${id}`, {
      status,
    });
    await refetch();
    window.location.reload();
    setLoading(false);
  };

  return (
    <div ref={drop} className="">
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
            .map((task, i) => (
              <SingleTask setLoading={setLoading} key={i} task={task} />
            ))
        ) : (
          <p className="pl-5 text-primary py-2 font-semibold">No Tasks Here</p>
        )}
      </div>
      {/*  */}
    </div>
  );
};
//! Single Task -----------------------
const SingleTask = ({ task, setLoading }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  if (isDragging) {
    setLoading(true);
  }
  return (
    <div
      onClick={() => console.log(task._id)}
      ref={drag}
      className={`p-2 cursor-grab ${isDragging ? "opacity-25" : "opacity-100"}`}
    >
      <p className="pl-5 text-primary py-2 font-semibold border border-primary">
        {task.title}+{task._id}
      </p>
    </div>
  );
};

export default Tasks;
