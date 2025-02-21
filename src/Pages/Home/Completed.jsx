import { useState } from "react";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Auth/Hook/useAxiosPublic";

import { FaPlus } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import useAuth from "../../Auth/Hook/useAuth";
import TaskCompleted from "./TaskCompleted";

const Completed = () => {
  // useHooks
  const axiosPublic = useAxiosPublic();
  const { users } = useAuth();
  const email = users?.email;
  const category = "Completed";

  // state for showField
  const [showField, setShowField] = useState(false);

  // tanstack
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks", category],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/tasksCompleted?email=${email}&category=${category}`
      );
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
      email,
      category,
    };

    // create ToDo task in DB
    axiosPublic.post("/tasks", todoTask).then((res) => {
      console.log(res.data);
      if (res.data.acknowledged) {
        setShowField(!showField);
        toast.success("A New Task Added");
        refetch();
      }
    });
  };
  return (
    <>
      <div className=" bg-gray-300 dark:bg-slate-900 px-6 pt-12 pb-14 rounded-lg">
        <h2 className="pl-3 font-bold text-2xl pb-3">Completed</h2>

        {/* all task based on category */}
        {tasks?.map((task) => (
          <TaskCompleted
            key={task._id}
            task={task}
            refetch={refetch}
          ></TaskCompleted>
        ))}

        {/* new task */}
        <div>
          {showField && (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                maxLength={50}
                onChange={(e) => {
                  if (e.target.value.length >= 50) {
                    toast.warning(
                      "You can only enter a maximum of 50 characters."
                    );
                  }
                }}
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

          {!showField && (
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
      </div>
    </>
  );
};

export default Completed;
