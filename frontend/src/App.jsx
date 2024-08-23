import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import ConnectButton from "./components/ConnectButton";
import Form from "./components/Form";
import Card from "./components/Card";
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
    const contractAddress = "0x4f0E4F8d46ae952EA466f7F17eF7e41EfAa806C4";
    const contractABI = abi.abi;
    // console.log(contractABI);

    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      // contract.connect(provider);

      setState({ provider, signer, contract });

      // Debug: Log the contract object and ABI
      // console.log("Contract Instance:", contract);
      // console.log("Contract ABI:", contractABI);
      // console.log("Contract provider:", provider);
      // console.log("Contract signer:", signer);
      // console.log("Contract state:", state);
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
    <div className="bg-slate-600 font-medium w-full h-screen flex">
      {/* Sidebar the left */}
      <div className="hidden sm:block md:block lg:block xl:block">
        <div className="flex h-screen justify-centers ">
          <Sidebar className="fixed top-0 left-0 w-64 h-full bg-slate-800 z-10" />
        </div>
      </div>

      {/* Main content area */}
      <div className=" flex flex-col w-full h-full">
        {/* ConnectButton fixed on the top right */}
        <div className="fixed top-0 right-0 p-5 bg-slate-600 z-20">
          <ConnectButton account={account} setAccount={setAccount} />
        </div>

        {/* Main content scrollable */}
        <div className="flex-1 overflow-hidden p-5 pt-28">
          <div className="relative w-full h-full overflow-auto scrollbar-hidden">
            <div className="relative w-full h-full overflow-auto scrollbar-hidden">
              <Card state={state} />
            </div>

            {/* <div className="h-full max-h-[calc(100vh-4rem)] overflow-auto scrollbar-hidden">
              <Form state={state} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
