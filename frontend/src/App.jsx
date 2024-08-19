import React from "react";
import Sidebar from "./components/Sidebar";
import ConnectButton from "./components/ConnectButton";
import Form from "./components/Form";
import Card from "./components/Card";

const App = () => {
  return (
    <div className="bg-slate-600 font-medium w-full h-screen flex">
      {/* Sidebar fixed on the left */}
      <Sidebar className="fixed top-0 left-0 w-64 h-full bg-slate-800 z-10" />

      {/* Main content area */}
      <div className=" flex flex-col w-full h-full">
        {/* ConnectButton fixed on the top right */}
        <div className="fixed top-0 right-0 p-5 bg-slate-600 z-20">
          <ConnectButton />
        </div>

        {/* Main content scrollable */}
        <div className="flex-1 overflow-hidden p-5 pt-28">
          <div className="relative w-full h-full overflow-auto scrollbar-hidden">
            <div className="grid grid-cols-5 grid-flow-row ">
              <Card />
            </div>
            {/* <div className="h-full max-h-[calc(100vh-4rem)] overflow-auto scrollbar-hidden">
              <Form />
            </div> */}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Hide scrollbar for WebKit browsers */
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for Firefox */
        .scrollbar-hidden {
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default App;
