/* eslint-disable react/prop-types */
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { MdDelete, MdEdit } from "react-icons/md";
import useAxiosPublic from "../../Auth/Hook/useAxiosPublic";
import { toast } from "react-toastify";

const TaskColumn = ({ category, tasks, handleDeleteTask, refetchTasks }) => {
  const axiosPublic = useAxiosPublic();

  const handleUpdateModal = async (taskId) => {
    document.getElementById(taskId).showModal();
    try {
      const { data } = await axiosPublic.get(`/singleTasks/${taskId}`);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // handleUpdateTask
  const handleUpdateTask = async (event, taskId) => {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;

    const updateData = { title, description };

    try {
      const { data } = await axiosPublic.patch(
        `/update-task/${taskId}`,
        updateData
      );

      if (data.result.modifiedCount) {
        console.log("✅ Task updated:", data);
        refetchTasks(); // Refetch tasks to update UI

        toast.success("Task Updated Successfully");
        document.getElementById(taskId).close();
      } else {
        toast.info("You haven't provided any data to update");
        document.getElementById(taskId).close();
      }
    } catch (err) {
      console.log("❌ Error updating task:", err);
    }
  };

  return (
    <div className="px-5 py-10 bg-gray-200 rounded-lg dark:bg-slate-800">
      <h2 className="text-3xl font-bold mb-7">{category}</h2>
      <Droppable droppableId={category}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4 min-h-[100px]"
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task._id.toString()}
                draggableId={task._id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="px-4 py-5 bg-white dark:bg-gray-600 rounded shadow"
                  >
                    <div className="flex gap-2 justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-xl">{task.title}</h3>
                      </div>
                      <div className="flex gap-2 items-center">
                        <button
                          className="btn px-2.5"
                          onClick={() => handleUpdateModal(task._id)}
                        >
                          <MdEdit size={22} />
                        </button>
                        <button
                          className="btn px-2.5"
                          onClick={() => handleDeleteTask(task._id)}
                        >
                          <MdDelete size={22} />
                        </button>

                        {/* modal */}
                        <dialog id={task._id} className="modal">
                          <div className="modal-box dark:bg-slate-800">
                            <form
                              onSubmit={(e) => handleUpdateTask(e, task._id)}
                              className="px-2 py-4"
                            >
                              <h2 className="text-2xl font-bold pb-5">
                                Update Task
                              </h2>

                              <input
                                type="text"
                                name="title"
                                defaultValue={task.title}
                                placeholder="Update Title"
                                className="input input-bordered w-full mb-5 dark:bg-gray-600"
                              />

                              {/* textarea */}
                              <textarea
                                name="description"
                                placeholder="Update Description"
                                defaultValue={task.description}
                                className="textarea textarea-bordered textarea-lg w-full p-4 text-base mb-5 dark:bg-gray-600"
                                rows={4}
                              ></textarea>

                              {/* submit btn */}
                              <button
                                type="submit"
                                className="btn text-xl font-bold bg-[#005f73] hover:bg-[#103c44] text-white border-none px-6 mb-4"
                              >
                                Update Task
                              </button>

                              <button></button>
                            </form>
                          </div>
                          <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                          </form>
                        </dialog>
                      </div>
                    </div>

                    {/* description */}
                    <p className="text pt-1.5">{task?.description}</p>

                    <div className="flex justify-between mt-5">
                      <h4 className="text-sm text-gray-500 dark:text-white font-semibold">
                        {task.category}
                      </h4>
                      <p className="text-sm">
                        {new Date(task?.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskColumn;
