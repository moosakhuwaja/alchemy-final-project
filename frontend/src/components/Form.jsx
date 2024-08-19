import React, { useState } from "react";

const Form = ({ onSubmit }) => {
  const [owner, setOwner] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ owner, title, description, target, deadline, image });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto p-4 bg-gray-800 text-white rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-sm mb-2" htmlFor="owner">
          Campaign Owner
        </label>
        <input
          id="owner"
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="w-full p-2 rounded bg-gray-900"
          required
        />
      </div>
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
          Target Amount (in Wei)
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
