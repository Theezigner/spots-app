import React, { useState } from 'react';

export function NewPostButton({ onClick }) {
    return (
        <div className="new-post-button">
            <button onClick={onClick}><span>+</span> New Post</button>
        </div>
    );
}

export function NewPostModal({ onClose, onAdd }) {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!imageFile || !description.trim()) return;

    const newCard = {
      id: Date.now(),
      imgSrc: URL.createObjectURL(imageFile),
      imgAlt: "User Post Image",
      description: description.trim(),
      heartId: "post" + Date.now(),
    };

    onAdd(newCard);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="new-post-modal p-6 rounded-lg w-[400px] space-y-4 relative">
        <button className="close-new-post-modal absolute top-2 right-2 text-xl" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-lg font-bold text-center">Create New Post</h2>

        <label className="block">
          Upload Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        {imagePreview && (
          <img src={imagePreview} className="w-full h-[200px] object-cover rounded" alt="Preview" />
        )}

        <label className="block">
          Description:
          <textarea
            rows="2"
            className="w-full border p-2 mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <button
          className="post-button w-full bg-black text-white py-2 rounded"
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>
    </div>
  );
}