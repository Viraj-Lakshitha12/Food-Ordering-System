import React, {useState, ChangeEvent} from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

interface UserProfileProps {
}

const UserProfile: React.FC<UserProfileProps> = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [userData, setUserData] = useState({
        userName: '',
        email: '',
        address: '',
        postalCode: '',
        city: '',
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement>, type: string): void => {
        setUserData((prevData) => ({...prevData, [type]: e.target.value}));
    };

    const handleProfileUpdate = async () => {
        try {
            const base64Image = selectedImage ? await getBase64(selectedImage) : null;

            const data = {
                ...userData,
                base64Image,
            };

            //update profile Details
            const response = await axios.post('http://localhost:8080/api/user/saveUserDetails', data).then(r => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully update profile!",
                    showConfirmButton: false,
                    timer: 2500
                });
            }).catch(error => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: error,
                    showConfirmButton: false,
                    timer: 2500
                });
            });
            console.log('Profile update successful', response);
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const getBase64 = (file: any) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                const result = reader.result;
                if (typeof result === 'string') {
                    const base64Data = result.split(',')[1];
                    resolve(base64Data);
                } else {
                    reject(new Error('Failed to read as Data URL'));
                }
            };

            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <section className="my-5">
            <div className="text-center text-gray-500 font-semibold text-xl">
                <p className="font-bold text-red-600 text-4xl">Profile</p>
            </div>

            <div className="flex flex-col items-center">
                <div className="max-w-md">
                    <div className="w-full max-w-md p-5">
                        {selectedImage ? (
                            <img
                                src={selectedImage}
                                alt="User Profile"
                                className="rounded-2xl mx-auto my-4"
                                style={{maxWidth: '200px', maxHeight: '200px'}}
                            />
                        ) : (
                            <div className="text-center my-4 font-bold mx-auto">
                                <p>No image selected</p>
                            </div>
                        )}
                        <label
                            htmlFor="imageInput"
                            className="cursor-pointer font-bold rounded-md bg-gray-900 text-white text-center max-w-xl block p-2"
                        >
                            Choose an image
                            <input
                                type="file"
                                id="imageInput"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div className="grid items-center">
                        <div className="my-2 grid grid-cols-2 gap-4">
                            <input
                                id="firstName"
                                className="col-span-2 p-2 my-1 max-w-4xl mx-2 rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="First and last name"
                                onChange={(e) => handleInput(e, 'userName')}
                            />
                            <input
                                id="email"
                                className="col-span-2 p-2 max-w-4xl mx-2 rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="example@gmail.com"
                                onChange={(e) => handleInput(e, 'email')}
                            />
                            <input
                                id="address"
                                className="col-span-2 p-2 max-w-4xl mx-2 rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="street address"
                                onChange={(e) => handleInput(e, 'address')}
                            />
                        </div>
                        <div className="my-1 grid grid-cols-2 gap-4">
                            <input
                                id="postalCode"
                                className="mt-1 p-2 max-w-4xl mx-2 rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="postal code"
                                onChange={(e) => handleInput(e, 'postalCode')}
                            />
                            <input
                                id="city"
                                className="mt-1 p-2 max-w-4xl mx-2 rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="city"
                                onChange={(e) => handleInput(e, 'city')}
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col items-center">
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded-full"
                            onClick={handleProfileUpdate}
                        >
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
