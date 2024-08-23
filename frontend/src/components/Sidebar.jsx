import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  return (
    <div className="w-24 bg-slate-900 z-2 m-5 text-white rounded-lg flex flex-col items-center justify-center">
      <Link
        to="/"
        className="w-15 h-25 flex items-center justify-center text-4xl p-4"
      >
        <MdDashboard size="48" />
      </Link>
      <Link
        to="/form"
        className="w-15 h-25 flex items-center justify-center text-4xl p-4 mt-9"
      >
        <GrAnnounce size="48" />
      </Link>
      <Link
        to="/my-campaigns"
        className="w-15 h-25 flex items-center justify-center text-4xl p-4 mt-9"
      >
        <CgProfile size="48" />
      </Link>
    </div>
  );
};

export default Sidebar;
