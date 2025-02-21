import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

const Home = () => {
  const [showField, setShowField] = useState(false);
  return (
    <>
      <div className=" min-h-[85vh]">
        <div className="grid grid-cols-3 max-w-screen-xl mx-auto gap-10 pt-10 pb-28 px-6">
          {/* toDo */}
          <div className=" bg-gray-300 dark:bg-slate-900 px-6 py-6 rounded-lg">
            <h2 className="pl-3 font-bold text-xl">To-Do</h2>

            {/* task */}
            <div className="bg-base-200 hover:outline outline-1 outline-gray-400  dark:outline-slate-700  flex justify-between items-center dark:bg-slate-800  rounded-lg py-0.5 px-4 my-4">
              <h2 className="font-semibold">Title</h2>
              <button className="btn px-3.5 cursor-pointer dark:bg-slate-800 border-none dark:text-white dark:hover:bg-slate-900 hover:bg-gray-300 rounded-lg">
                <FaPencilAlt size={22}></FaPencilAlt>
              </button>
            </div>

            {/* new task */}
            <div>
              {showField && (
                <div>
                  {/* input field */}
                  <input
                    type="text"
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
                </div>
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

          {/* inProgress */}
          <div className="bg-base-200 px-6 py-6 rounded-lg">b</div>

          {/* taskComplated */}
          <div className="bg-base-200 px-6 py-6 rounded-lg">c</div>
        </div>
      </div>
    </>
  );
};

export default Home;
