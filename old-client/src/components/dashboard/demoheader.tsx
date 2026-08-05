import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const DashboardHeader = () => {
  return (
    <div className="flex items-center justify-between mb-10">

      <div>
        <h1 className="text-3xl font-black text-white">
          My Websites
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your published projects
        </p>
      </div>

      <Link
        to="/templates"
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700"
      >
        <FaPlus />
        New Project
      </Link>

    </div>
  );
};

export default DashboardHeader;