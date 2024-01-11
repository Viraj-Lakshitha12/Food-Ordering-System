import React, {useState} from 'react';
import axios from 'axios';

function UserProfile() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');


    const handleInput: any = (e: any, type: any): void => {
        switch (type) {
            case 'userName':
                setUserName(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'address':
                setAddress(e.target.value)
                break;
            case 'postalCode':
                setPostalCode(e.target.value)
                break;
            case 'city':
                setCity(e.target.value)
                break;
        }
    }

    const handleProfileUpdate = async () => {
        const data = {
            firstName: userName,
            email: email,
            address: address,
            postalCode: postalCode,
            city: city,
            base64Image: selectedImage ? await getBase64(selectedImage) : null,
        };

        try {
            const response = await axios.post('http://localhost:3000/api/updateProfile', data);
            console.log('Profile update successful', response.data);
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const getBase64 = (file: any) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result?.toString().split(',')[1] || '');
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <section className="my-5">
            <div className="text-center text-gray-500 font-semibold text-xl">
                <p className="font-bold text-red-600 text-4xl ">Profile</p>
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
                                onChange={handleInput}

                            />
                            <input
                                id="email"
                                className="col-span-2 p-2 max-w-4xl mx-2 rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="example@gmail.com"
                                onChange={handleInput}
                            />
                            <input
                                id="address"
                                className="col-span-2 p-2 max-w-4xl mx-2 rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="street address"
                                onChange={handleInput}
                            />
                        </div>
                        <div className="my-1 grid grid-cols-2 gap-4">
                            <input
                                id="postalCode"
                                className="mt-1 p-2 max-w-4xl mx-2 rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="postal code"
                                onChange={handleInput}
                            />
                            <input
                                id="city"
                                className="mt-1 p-2 max-w-4xl mx-2 rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="city"
                                onChange={handleInput}
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
}

export default UserProfile;
