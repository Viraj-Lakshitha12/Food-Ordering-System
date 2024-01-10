import React, {useState} from 'react';

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
                <div className=" max-w-md">
                    <div className="w-full max-w-md">
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt="User Profile"
                                className=" rounded-2xl mx-auto my-4"
                                style={{maxWidth: '200px', maxHeight: '200px'}}
                            />
                        ) : (
                            <div className="text-center my-4 font-bold mx-auto">
                                <p>No image selected</p>
                            </div>
                        )}
                        <label
                            htmlFor="imageInput"
                            className="cursor-pointer border border-gray-800 text-center max-w-xl block p-2">
                            Choose an image
                            <input type="file" id="imageInput" accept="image/*" onChange={handleImageChange}
                                   className="hidden"/>
                        </label>
                    </div>
                    <div className={'flex flex-col items-center'}>
                        <input className={'mt-1 p-2 max-w-4xl rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800 text-center'} type={'text'} placeholder={"First and last name"}/>
                    </div>


                    <div className="mt-4  flex flex-col items-center">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full"
                                onClick={handleProfileUpdate}>
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserProfile;
