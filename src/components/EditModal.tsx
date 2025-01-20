import { useEffect, useState } from "react";
import { getTask, updateTask } from "../lib/api";

function EditModal({ id }: { id: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    console.log("useeffect called");
    console.log(id);
    if (id) {
      getTask(id)
        .then((data) => {
          setTask(data);
        })
        .catch((e) => console.error(e));
    }
  }, [id]);

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.id, e.target.value);
    setTask({ ...task, [e.target.id]: e.target.value });
  };

  const handleTaskUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (
      document.getElementById("description") as HTMLInputElement
    ).value;
    const dueTime = (document.getElementById("dueTime") as HTMLInputElement)
      .value;
    const priority = parseInt(
      (document.getElementById("priority") as HTMLInputElement).value
    );
    if (task) {
      const updatedTask = { ...task, title, description, dueTime, priority };
      console.log(updatedTask);

      updateTask(updatedTask, id)
        .then((data) => {
          console.log(data);
          window.location.reload();
        })
        .catch((e) => console.error(e));
    }
  };

  return (
    <div className="flex  items-center justify-center ">
      <div className="bg-white p-6 shadow-lg hover:shadow-xl rounded-lg w-full max-w-lg sm:p-8 transition-shadow ">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Edit Task
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
              value={task?.title || ""}
              onChange={handleStateChange}
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
              value={task?.description || ""}
              onChange={handleStateChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <input
              type="date"
              id="startTime"
              value={new Date().toISOString().split("T")[0]}
              readOnly
              onChange={handleStateChange}
              min={new Date().toISOString().split("T")[0]}
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
              value={
                task?.dueTime
                  ? new Date(task.dueTime).toISOString().split("T")[0]
                  : new Date().toISOString().split("T")[0]
              }
              onChange={handleStateChange}
              min={new Date().toISOString().split("T")[0]}
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
              value={task?.priority || 0}
              onChange={handleStateChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
          <button
            type="submit"
            onClick={handleTaskUpdate}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
          >
            Done
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
