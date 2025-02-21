import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Auth/Hook/useAxiosPublic";

import { FaPencilAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

const ToDo = () => {
  // useHooks
  const axiosPublic = useAxiosPublic();

  // state for showField
  const [showField, setShowField] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [taskId, setTaskId] = useState("");

  // tanstack
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tasks");
      return res.data;
    },
  });

  // handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    if (!title) {
      return toast.error("Title is Empty");
    }
    const todoTask = {
      title,
      category: "To-Do",
    };

    // create ToDo task in DB
    axiosPublic.post("/tasks", todoTask).then((res) => {
      console.log(res.data);
      if (res.data.acknowledged) {
        setShowField(!showField);
        refetch();
      }
    });
  };

  // handleEdit
  const handleEdit = (id) => {
    setShowEdit(!showEdit);
    setTaskId(id);
  };

  // handleEditSubmit
  const handleEditSubmit = (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    if (!title) {
      return toast.error("Updating Input is Empty");
    }

    // update task title in DB
    axiosPublic.patch(`/tasks/${taskId}`, {title}).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        setShowEdit(!showEdit);
        refetch();
      }
    });
  };

  return (
    <>
      <div className=" bg-gray-300 dark:bg-slate-900 px-6 pt-12 pb-14 rounded-lg">
        <h2 className="pl-3 font-bold text-xl">To-Do</h2>

        {/* all task based on category */}
        {tasks?.map((task) => (
          <div
            key={task._id}
            className="bg-base-200 hover:outline outline-1 outline-gray-400  dark:outline-slate-700  flex justify-between items-center dark:bg-slate-800  rounded-lg py-0.5 px-4 my-4"
          >
            <h2 className="font-semibold">{task.title}</h2>
            <button
              onClick={() => handleEdit(task._id)}
              className={`btn px-3.5 cursor-pointer dark:bg-slate-800 border-none dark:text-white dark:hover:bg-slate-900 hover:bg-gray-300 rounded-lg 
                ${(showEdit || showField) && "invisible"}`}
            >
              <FaPencilAlt size={22}></FaPencilAlt>
            </button>
          </div>
        ))}

        {/* new task */}
        <div>
          {showField && (
            <form onSubmit={handleSubmit}>
              {/* input field */}
              <input
                type="text"
                name="title"
                placeholder="Enter a Title"
                className="input input-bordered w-full bg-base-200 border-none dark:outline-slate-700 dark:bg-slate-800"
              />
              <div className="flex justify-between my-4">
                <button className="btn dark:bg-slate-800 dark:text-white border-none hover:outline outline-gray-400 hover:bg-base-200 dark:outline-slate-700 outline-1">
                  Add
                </button>
                <button
                  onClick={() => setShowField(!showField)}
                  className="btn dark:bg-slate-800 dark:text-white border-none hover:outline outline-gray-400 hover:bg-base-200 dark:outline-slate-700 outline-1"
                >
                  <ImCross></ImCross>
                </button>
              </div>
            </form>
          )}

          {!showField && !showEdit && (
            <>
              {/* add task btn */}
              <button
                onClick={() => setShowField(!showField)}
                className="btn dark:bg-slate-800 dark:text-white border-none hover:outline outline-gray-400 hover:bg-base-200 dark:outline-slate-700 outline-1"
              >
                <FaPlus></FaPlus> Add a Task
              </button>
            </>
          )}
        </div>

        {/* edit task */}
        <div>
          {showEdit && (
            <form onSubmit={handleEditSubmit}>
              {/* input field */}
              <input
                type="text"
                name="title"
                placeholder="Update Title"
                className="input input-bordered w-full bg-base-200 border-none dark:outline-slate-700 dark:bg-slate-800"
              />
              <div className="flex justify-between my-4">
                <button className="btn dark:bg-slate-800 dark:text-white border-none hover:outline outline-gray-400 hover:bg-base-200 dark:outline-slate-700 outline-1">
                  Update
                </button>
                <button
                  onClick={() => setShowEdit(!showEdit)}
                  className="btn dark:bg-slate-800 dark:text-white border-none hover:outline outline-gray-400 hover:bg-base-200 dark:outline-slate-700 outline-1"
                >
                  <ImCross></ImCross>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ToDo;
