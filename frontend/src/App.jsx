import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import ConnectButton from "./components/ConnectButton";
import Form from "./components/Form";
import Card from "./components/Card";
import Donate from "./components/Donate";
import { ethers } from "ethers";
import abi from "./contractABI/CrowdFunding.json";

const App = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [account, setAccount] = useState("none");

  const setupContract = async (provider) => {
    const contractAddress = "0xF413799c34409558409ad334e193eb373eb86517";
    const contractABI = abi.abi;

    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setState({ provider, signer, contract });
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (account !== "none") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setupContract(provider);
    }
  }, [account]);

  return (
    <Router>
      <div className="bg-slate-600 font-medium w-full h-screen flex">
        {/* Sidebar */}
        <div className="hidden sm:block md:block lg:block xl:block">
          <div className="flex h-screen justify-centers ">
            <Sidebar className="fixed top-0 left-0 w-64 h-full bg-slate-800 z-10" />
          </div>
        </div>

        {/* Main content area */}
        <div className="flex flex-col w-full h-full">
          {/* ConnectButton fixed on the top right */}
          <div className="fixed top-0 right-0 p-5 bg-slate-600 z-20">
            <ConnectButton account={account} setAccount={setAccount} />
          </div>

          {/* Main content scrollable */}
          <div className="flex-1 overflow-hidden p-5 pt-28">
            <div className="relative w-full h-full overflow-auto scrollbar-hidden">
              <Routes>
                <Route
                  path="/"
                  element={<Card state={state} filterByOwner={false} />}
                />
                <Route
                  path="/my-campaigns"
                  element={<Card state={state} filterByOwner={true} />}
                />
                <Route path="/form" element={<Form state={state} />} />
                <Route
                  path="/donate/:campaignId"
                  element={<Donate state={state} />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
