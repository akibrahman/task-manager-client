import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useForm } from "react-hook-form";
import { FaPlus, FaRegEdit, FaSpinner, FaTimes } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "react-modal";
import useAxios from "../Hooks/useAxios";
import useUser from "../Hooks/useUser";
import { camelCaseToCapitalized } from "../Utils/camelCaseToCapitalized";
import Loader from "./Loader";

const Tasks = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [EditTaskId, setEditTaskId] = useState();
  const [deadline, setDeadline] = useState();

  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();
  const { user } = useUser();
  const statuses = ["toDo", "onGoing", "completed"];

  const { data: tasks, refetch } = useQuery({
    queryKey: ["Tasks", user?.email],
    queryFn: async ({ queryKey }) => {
      const data = await axiosInstance.get(`/get-tasks?email=${queryKey[1]}`);
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
    try {
      await axiosInstance.post("/add-task", { ...data, user: user.email });
      reset();
      closeModal();
      setDeadline(null);
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const taskDeleter = async (id) => {
    await axiosInstance.delete(`/delete-task?id=${id}`);
    await refetch();
  };

  const taskUpdater = (data) => {
    console.log(data);
  };
  const handleUpdate = async (id) => {
    setEditTaskId(id);
    openEditModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const openEditModal = () => {
    setEditModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const closeEditModal = () => {
    setEditModalIsOpen(false);
    console.log("Editing Sesh");
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

  if (!tasks) return <Loader />;
  return (
    <div className="min-h-[calc(100vh-70px)]">
      {/* Add Modal  */}
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
      {/* Edit Modal  */}
      <Modal
        overlayClassName="Overlay"
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        style={customStyles}
        contentLabel="Edit Modal"
      >
        <EditTask
          mainRefetch={refetch}
          taskUpdater={taskUpdater}
          closeEditModal={closeEditModal}
          EditTaskId={EditTaskId}
          axiosInstance={axiosInstance}
        />
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 mb-4">
        {statuses.map((status, i) => (
          <SingleBlock
            handleUpdate={handleUpdate}
            taskDeleter={taskDeleter}
            axiosInstance={axiosInstance}
            setLoading={setLoading}
            status={status}
            refetch={refetch}
            tasks={tasks}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

//! Edit Task-------------------------
const EditTask = ({
  closeEditModal,
  EditTaskId = "a",
  axiosInstance,
  mainRefetch,
}) => {
  // const [editData, setEditData] = useState();
  const [newDeadline, setNewDeadline] = useState();
  const {
    register,
    // reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //!
  const {
    data: editData,
    // isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-review", EditTaskId],
    queryFn: async ({ queryKey }) => {
      const { data } = await axiosInstance.get(`/get-task?id=${queryKey[1]}`);
      // openEditModal();
      return data;
    },
  });

  const taskUpdater = async (data) => {
    if (
      !newDeadline &&
      data.title == editData.title &&
      data.description == editData.description &&
      data.priority == editData.priority
    ) {
      alert("No Change");
      return;
    }
    await axiosInstance.patch(`/edit-task?id=${EditTaskId}`, {
      ...data,
      deadline: newDeadline ? newDeadline : editData.deadline,
    });
    await refetch();
    await mainRefetch();
    closeEditModal();
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 flex items-center justify-between">
        Edit Task{" "}
        <FaTimes onClick={closeEditModal} className="cursor-pointer" />
      </h2>
      {editData && (
        <form onSubmit={handleSubmit(taskUpdater)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              {...register("title", { required: true })}
              type="text"
              defaultValue={editData.title}
              className="mt-1 p-2 w-80 border rounded-md text-primary"
              placeholder="Enter Title"
            />
            {errors.title?.type === "required" && (
              <p className="text-red-600 mt-1">Title is required</p>
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
              defaultValue={editData.description}
              placeholder="Enter Description"
            ></textarea>
            {errors.description?.type === "required" && (
              <p className="text-red-600">First name is required</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Prev Deadline - {editData.deadline.split("T")[0]}
            </label>
            <label htmlFor="deadline" className="block text-sm font-medium">
              Set New Deadline
            </label>
            <input
              {...register("deadline", { required: false })}
              type="date"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
              className="mt-1 p-2 w-80 border rounded-md text-primary"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="block text-sm font-medium">
              Priority
            </label>
            <select
              {...register("priority", { required: true })}
              defaultValue={editData.priority}
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
              <p className="text-red-600">Priority is required</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Update Task
          </button>
        </form>
      )}
    </>
  );
};
//! Single Block -----------------------
const SingleBlock = ({
  status,
  handleUpdate,
  tasks,
  setLoading,
  axiosInstance,
  refetch,
  taskDeleter,
}) => {
  const [, drop] = useDrop(() => ({
    accept: "TASK",
    drop: async (item) => await addTaskToSection(item.id, status),
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
              <SingleTask
                handleUpdate={handleUpdate}
                taskDeleter={taskDeleter}
                setLoading={setLoading}
                key={i}
                task={task}
              />
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
const SingleTask = ({ task, setLoading, taskDeleter, handleUpdate }) => {
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
      ref={drag}
      className={`p-2 cursor-grab ${isDragging ? "opacity-25" : "opacity-100"}`}
    >
      <div className="pl-5 text-primary py-2 font-semibold border border-primary flex items-center justify-between">
        <div className="">
          <div className="flex items-center gap-3">
            <p className="min-w-[120px]"> {task.title}</p>
            <p className="text-white bg-primary w-max text-sm px-2 py-1 rounded-full">
              {task.priority}
            </p>
          </div>
          <p className="mt-2">
            {/* Deadline: {moment(task.deadline).format("do-MMMM")} */}
            Deadline: {task.deadline.split("T")[0]}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FaRegEdit
            onClick={() => handleUpdate(task._id)}
            className="text-xl text-orange-500 mr-2 cursor-pointer"
          />
          <MdDelete
            onClick={() => taskDeleter(task._id)}
            className="text-xl text-red-500 mr-2 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
