import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "../lib/api";
import TaskCard from "./TaskCard";

function TaskList() {
  const {
    data: tasks,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching tasks</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {isFetching && <div className="text-center">Fetching...</div>}
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            id={task._id}
            task={task.title}
            description={task.description}
            date="2021-09-01"
          />
        ))
      ) : (
        <div className="w-screen text-center">No tasks found</div>
      )}
    </div>
  );
}

export default TaskList;
