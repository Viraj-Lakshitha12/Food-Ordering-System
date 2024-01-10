import React, { useState } from 'react';

function UserProfile() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // Add logic to update user profile with selected image
        // You can send the image to your server or perform other actions
        console.log('Profile updated with image:', selectedImage);
    };

    return (
        <section className="my-10">
            <div className="flex flex-col items-center">
                <div className="w-full max-w-md">
                    <div className="">
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt="User Profile"
                                className="rounded-2xl mx-auto my-4"
                                style={{ maxWidth: '200px', maxHeight: '200px' }}
                            />
                        ) : (
                            <div className="text-center my-4 font-bold mx-auto">
                                <p>No image selected</p>
                            </div>
                        )}
                        <label
                            htmlFor="imageInput"
                            className="cursor-pointer border border-gray-800 text-center w-full block p-4"
                        >
                            Choose an image
                            <input type="file" id="imageInput" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </label>
                    </div>
                    <div className="mt-4">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full" onClick={handleProfileUpdate}>
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserProfile;
