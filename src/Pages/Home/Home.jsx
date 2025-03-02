import useAuth from "../../Auth/Hook/useAuth";
import useAxiosPublic from "../../Auth/Hook/useAxiosPublic";
import AddTasks from "../AddTasks/AddTasks";
import TaskColumn from "./TaskColumn";
import { DragDropContext } from "@hello-pangea/dnd";
import { useEffect, useState, useCallback } from "react";
import AddTasksModal from "../AddTasksModal/AddTasksModal";
import { toast } from "react-toastify";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const { users } = useAuth();
  const email = users?.email;
  const [tasks, setTasks] = useState([]);

  // Function to refetch tasks
  const refetchTasks = useCallback(() => {
    if (email) {
      axiosPublic
        .get(`/tasks/${email}`)
        .then((res) => setTasks(res.data))
        .catch((err) => console.log("Error fetching tasks:", err));
    }
  }, [axiosPublic, email]);

  // Fetch tasks on component mount or when email changes
  useEffect(() => {
    refetchTasks();
  }, [refetchTasks]);

  // Handle drag-and-drop events
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
  
    // If dropped outside a valid destination, do nothing
    if (!destination) return;
  
    // If dropped in the same position, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  
    // Create a copy of tasks for manipulation
    const updatedTasks = Array.from(tasks);
  
    // Find the dragged task
    const draggedTaskIndex = tasks.findIndex((task) => task._id === draggableId);
    const draggedTask = tasks[draggedTaskIndex];
  
    if (!draggedTask) return;
  
    // Remove the dragged task from its original position
    updatedTasks.splice(draggedTaskIndex, 1);
  
    // Update category if moved to another column
    const newTask = {
      ...draggedTask,
      category: destination.droppableId,
    };
  
    // Filter tasks for the destination column
    const destinationTasks = updatedTasks.filter(
      (task) => task.category === destination.droppableId
    );
  
    // Insert the dragged task at the new position
    destinationTasks.splice(destination.index, 0, newTask);
  
    // Merge back into updatedTasks
    const mergedTasks = [
      ...updatedTasks.filter((task) => task.category !== destination.droppableId),
      ...destinationTasks,
    ];
  
    // Update local state
    setTasks(mergedTasks);
  
    // Send update to the server (optional: send new order if needed)
    axiosPublic
      .patch(`/tasks/${draggableId}`, { category: destination.droppableId })
      .then((res) => console.log("Task Updated", res.data))
      .catch((err) => {
        console.error("Error updating task:", err);
        setTasks(tasks); // Revert on error
      });
  };
  

  // Handle task deletion
  const handleDeleteTask = (taskId) => {
    axiosPublic
      .delete(`/tasks/${taskId}`)
      .then((res) => {
        if (res.data.deletedCount > 0) {
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task._id !== taskId)
          );
          console.log("Task Deleted Successfully");
          toast.success("Task Deleted Successfully")
        }
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  return (
    <div className="min-h-[85vh]">
      <div className="flex justify-center pb-6 pt-8">
        <AddTasks refetchTasks={refetchTasks} />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 xl:max-w-screen-xl md:max-w-screen-lg max-w-screen-sm mx-auto gap-10 pt-10 pb-28 px-6">
          <TaskColumn
            handleDeleteTask={handleDeleteTask}
            refetchTasks={refetchTasks}
            category="To-Do"
            tasks={tasks.filter((task) => task.category === "To-Do")}
          />
          <TaskColumn
            handleDeleteTask={handleDeleteTask}
            refetchTasks={refetchTasks}
            category="In Progress"
            tasks={tasks.filter((task) => task.category === "In Progress")}
          />
          <TaskColumn
            handleDeleteTask={handleDeleteTask}
            refetchTasks={refetchTasks}
            category="Completed"
            tasks={tasks.filter((task) => task.category === "Completed")}
          />
        </div>
      </DragDropContext>

      {/* Pass refetchTasks to Modal */}
      <AddTasksModal refetchTasks={refetchTasks} />
    </div>
  );
};

export default Home;