import React, { useState } from 'react';

export function EditProfileButton({ onClick }) {
    return (
        <button className="edit-profile-button flex flex-row items-center gap-1">
            <img src='/assets/Group 2.png'/>
            <button className="bg-transparent border-none bottom-0" onClick={onClick}>Edit Profile</button>
        </button>
    );
}

export function EditProfileModal({ onClose, onSave, name, bio, image }) {
    const [newName, setNewName] = useState(name);
    const [newBio, setNewBio] = useState(bio);
    const [previewImage, setPreviewImage] = useState(image);
    const [fileImage, setFileImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSave = () => {
        if (fileImage) {
            const newImageURL = URL.createObjectURL(fileImage);
            onSave({ name: newName, bio: newBio, image: newImageURL });
        } else {
            onSave({ name: newName, bio: newBio, image: previewImage });
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className=" edit-profile-modal p-6 rounded-lg  space-y-4 relative">
                <button className="close-edit-profile-modal absolute top-2 right-2 text-xl " onClick={onClose}>✕</button>
                <h2 className="text-lg text-center font-bold">Edit Profile</h2>

                <div className="flex flex-col gap-2 w-full ">
                    <label className="block">
                        
                        <h2 className="text-ms mb-1 font-bold text-[rgba(33, 33, 33, 1);
]">Change Profile Image:</h2>
                        <section className='w-full border p-2 rounded shadow'>
                            {previewImage && (
                        <img
                            src={previewImage}
                            alt="Preview"
                            className="w-24 h-24 rounded mt-2 object-cover"
                        />
                    )}
                        <input
                            type="file"
                            accept="image/*"
                            className="mt-1 items-center mx-auto"
                            onChange={handleImageChange}
                        />
                        </section>

                    </label>
                    
                </div>

                <label className="block">
                    <h2 className="text-ms mb-1 font-bold text-[rgba(33, 33, 33, 1);
]">Username:</h2>
                    <input
                        type="text"
                        className="w-full border p-1 mt-1"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </label>

                <label className="block">
                    <h2 className="text-ms mb-1 font-bold text-[rgba(33, 33, 33, 1);
]">Bio:</h2>
                    <textarea
                        className="w-full border p-1 mt-1"
                        rows="3"
                        value={newBio}
                        onChange={(e) => setNewBio(e.target.value)}
                    />
                </label>

                <button
                    className=" save-changes-button"
                    onClick={handleSave}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
