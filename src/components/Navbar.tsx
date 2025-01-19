import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    // Redirect to login page
    navigate("/login");
  };

  const onNewTask = () => {
    navigate("/create-task");
  };

  return (
    <nav className="flex bg-white items-center justify-around font-semibold text-blue-500 p-4">
      <Link to="/" className="text-2xl">
        Task Manager
      </Link>

      <div className=" text-sm">
        <button
          className="bg-blue-500 mr-2 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-200 ease-in-out"
          onClick={onNewTask}
        >
          New
        </button>

        <button
          className="ml-auto bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-200 ease-in-out
        "
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
