import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="flex flex-col bg-white p-10 rounded-lg shadow-lg sm:w-4/6 md:w-3/6 lg:w-2/6">
      <h1 className="text-center font-semibold text-2xl text-blue-500 mb-5">
        Forgot Password
      </h1>

      <form className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border border-gray-300 rounded"
        />
        <button className="p-2 bg-blue-500 text-white rounded">
          Send Reset Link
        </button>
      </form>

      <div className="mt-4">
        <Link to="/login" className="text-blue-500">
          Back to Login &gt;
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
