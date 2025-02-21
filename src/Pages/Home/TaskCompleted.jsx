/* eslint-disable react/prop-types */

import { useRef, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { toast } from "react-toastify";
import useAxiosPublic from "../../Auth/Hook/useAxiosPublic";

const TaskCompleted = ({ task, refetch }) => {
  const { _id: id, title: taskTitle } = task || {};

  // useHooks
  const nameRef = useRef();
  const axiosPublic = useAxiosPublic();

  // state for editable
  const [editable, setEdiable] = useState(false);

  // handleEdit
  const handleEdit = () => {
    const title = nameRef.current.value;
    if (!title) {
      return toast.error("Updating Input is Empty");
    }

    // update task title in DB
    axiosPublic.patch(`/tasks/${id}`, { title }).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        setEdiable(!editable);
        toast.success("Title Updated Successfully");
        refetch();
      }
    });
  };
  return (
    <>
      <div className="my-4">
        <label
          className={`input input-bordered flex items-center gap-2 w-full font-semibold bg-base-200 border-none dark:bg-slate-800`}
        >
          <input
            type="text"
            ref={nameRef}
            readOnly={!editable}
            defaultValue={taskTitle}
            autoFocus={true}
            maxLength={50}
            onChange={(e) => {
              if (e.target.value.length >= 50) {
                toast.warning("You can only enter a maximum of 50 characters.");
              }
            }}
            className="grow focus:border-none"
          />

          {!editable ? (
            <>
              {/* edit btn */}
              <button
                data-tip="Edit Title"
                onClick={() => setEdiable(!editable)}
                className={`tooltip btn px-3.5 cursor-pointer dark:bg-slate-800 border-none dark:text-white dark:hover:bg-slate-900 hover:bg-gray-300 rounded-lg`}
              >
                <FaPencilAlt size={19}></FaPencilAlt>
              </button>
            </>
          ) : (
            <>
              {/* update btn */}
              <button
                data-tip="Update Title"
                onClick={handleEdit}
                className={`tooltip btn px-3.5 cursor-pointer dark:bg-slate-800 border-none dark:text-white dark:hover:bg-slate-900 hover:bg-gray-300 rounded-lg`}
              >
                <IoMdDoneAll size={22}></IoMdDoneAll>
              </button>
            </>
          )}
        </label>
      </div>
    </>
  );
};

export default TaskCompleted;
