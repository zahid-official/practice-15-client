/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Auth/Hook/useAxiosPublic";
import useAuth from "../../Auth/Hook/useAuth";
import { toast } from "react-toastify";

const AddTasksModal = ({ refetchTasks }) => {
  const axiosPublic = useAxiosPublic();
  const { users } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const TaskCategory = {
      title: data.title,
      description: data.description || "",
      email: users?.email,
      timestamp: new Date().toISOString(),
      category: "To-Do",
    };

    try {
      const { data } = await axiosPublic.post("/tasks", TaskCategory);
      console.log("Task Added:", data);

      if (data.acknowledged) {
        // Refetch tasks after adding
        refetchTasks();

        reset(); // Clear form after successful submission
        toast.success("Task Added Successfully");
        document.getElementById("my_modal_1").close(); // Close modal
      }
    } catch (error) {
      console.log("Error adding task:", error);
    }
  };

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box  dark:bg-slate-800">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <h3 className="text-2xl font-bold pt-6 pb-5">Add a New Task</h3>
            <input
              type="text"
              maxLength={50}
              {...register("title", {
                required: "Title is required",
                maxLength: 50,
              })}
              placeholder="Task Title"
              className="input input-bordered w-full dark:bg-gray-600"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}

            <textarea
              {...register("description", { maxLength: 200 })}
              maxLength={200}
              placeholder="Task Description (optional)"
              className="textarea textarea-bordered w-full mt-4 dark:bg-gray-600"
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}

            <div className="my-4">
              <button
                type="submit"
                className="btn text-xl font-bold bg-[#005f73] hover:bg-[#103c44] text-white border-none px-6 mb-4"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddTasksModal;
