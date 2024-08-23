import React, { useState } from "react";
import { ethers } from "ethers";

const Form = ({ state }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the contract is available
    if (!state.contract) {
      alert("Contract is not initialized.");
      return;
    }

    // Create a campaign using the form data
    try {
      const { contract } = state;
      const tx = await contract.createCampaign(
        state.signer,
        title,
        description,
        ethers.parseEther(target), // Convert target amount to Wei
        deadline,
        image
      );

      await tx.wait(); // Wait for the transaction to be mined
      alert("Campaign created successfully!");
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Error creating campaign. Check console for details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-4 bg-gray-800 text-white rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-sm mb-2" htmlFor="title">
          Campaign Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-900"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2" htmlFor="description">
          Campaign Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded bg-gray-900"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2" htmlFor="target">
          Target Amount
        </label>
        <input
          id="target"
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full p-2 rounded bg-gray-900"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2" htmlFor="deadline">
          Deadline (UNIX timestamp)
        </label>
        <input
          id="deadline"
          type="number"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-2 rounded bg-gray-900"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-2" htmlFor="image">
          Image URL
        </label>
        <input
          id="image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 rounded bg-gray-900"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Create Campaign
      </button>
    </form>
  );
};

export default Form;
