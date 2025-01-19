import { useState } from "react";
import { createTask } from "../lib/api";

function CreateTask() {
  const [{ title, description, dueTime, priority }, setTask] = useState({
    title: "",
    description: "",
    dueTime: "",
    priority: 0,
  });

  const handleCreateTask = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log(title, description, dueTime, priority);

    createTask({ title, description, dueTime, priority })
      .then((response) => {
        if (response.ok) {
          console.log("Task created");

          setTask({
            title: "",
            description: "",
            dueTime: "",
            priority: 0,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex items-center lg:w-1/4 md:w-2/4 sm:1/2 justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 shadow-lg hover:shadow-xl rounded-lg w-full max-w-lg sm:p-8 transition-shadow">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create Task
        </h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) =>
                setTask((prev) => ({ ...prev, title: e.target.value }))
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) =>
                setTask((prev) => ({ ...prev, description: e.target.value }))
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dueTime"
              className="block text-sm font-medium text-gray-700"
            >
              Due Time
            </label>
            <input
              type="date"
              id="dueTime"
              value={dueTime}
              onChange={(e) =>
                setTask((prev) => ({ ...prev, dueTime: e.target.value }))
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <input
              type="number"
              id="priority"
              min={0}
              max={5}
              value={priority}
              onChange={(e) =>
                setTask((prev) => ({ ...prev, priority: +e.target.value }))
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <button
            type="submit"
            onClick={handleCreateTask}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTask;
