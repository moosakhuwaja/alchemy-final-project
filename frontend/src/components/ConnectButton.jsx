import React from "react";

const ConnectButton = ({ account, setAccount }) => {
  const connect = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("MetaMask is not installed!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });
      setAccount(accounts[0]);
    } catch (error) {
      alert(error.message);
    }
  };
  const shortenAccount = (account) => {
    return `${account.slice(0, 6)}...${account.slice(-4)}`;
  };

  return (
    <div>
      <button
        onClick={connect}
        className="px-4 py-2 rounded-md border-2 border-slate-900 mr-20 mt-4"
      >
        {account === "none"
          ? "Connect"
          : `Connected: ${shortenAccount(account)}`}
      </button>
    </div>
  );
};

export default ConnectButton;
