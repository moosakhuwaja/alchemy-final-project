import React from "react";

const Card = () => {
  return (
    <div className="relative flex-shrink-0 w-60 h-80 rounded-[15px] bg-zinc-900 text-white overflow-hidden shadow-lg mb-5">
      <div className="h-[40%] w-full">
        <img
          src="https://img.freepik.com/premium-photo/modern-automobile-classic-technology-wheel-traffic_665346-119.jpg"
          alt="Building a Car"
          className="w-full h-full object-cover rounded-t-[15px]"
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-[60%]">
        <div>
          <h3 className="text-lg font-bold">Building a Car</h3>
          <p className="text-gray-400">Building a Car</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-sm">0.05</p>
            <p className="text-xs text-gray-400">Raised of 0.5</p>
          </div>
          <div>
            <p className="text-sm">2</p>
            <p className="text-xs text-gray-400">Days Left</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs text-gray-400">
            by 0xc44bfa9310f6def90718717cda2...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
