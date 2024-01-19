import React, {useState, ChangeEvent, useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import Modal from 'react-modal';

interface UserData {
    userName: string;
    email: string;
    address: string;
    postalCode: string;
    city: string;
    admin: boolean;
    image?: File | null | string;
}

const UserProfile: React.FC = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserData>({
        userName: '',
        email: '',
        address: '',
        postalCode: '',
        city: '',
        admin: false,
        image: null,
    });
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    // Handle input change
    const handleInput = (e: ChangeEvent<HTMLInputElement>, type: keyof UserData): void => {
        setUserData((prevData) => ({...prevData, [type]: e.target.value}));
    };

    // Fetch user details on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Fetch user details from the server
    const fetchData = async () => {
        try {
            const userEmail = Cookies.get('user');
            if (!userEmail) {
                console.error('User email not found in Cookies.');
                return;
            }

            // Update email in user data state
            setUserData((prevData) => ({...prevData, email: userEmail}));

            // Fetch user details from the server
            const response = await axios.get(`http://localhost:8080/api/user/getUserDetailsByEmail/${userEmail}`);
            const userDetailData = response.data.data;
            console.log(userDetailData.image);
            setSelectedImage(userDetailData.image);

            // Update user data state
            setUserData((prevData) => ({
                ...prevData,
                userName: userDetailData.userName,
                address: userDetailData.address,
                postalCode: userDetailData.postalCode,
                city: userDetailData.city,
                admin: userDetailData.admin,
                image: userDetailData.image, // Update image directly
            }));

            // Check and set image if available
            if (userDetailData.image) {
                setSelectedImage(userDetailData.image);
            } else {
                console.warn('No base64 image data found in user details.');
            }
        } catch (error) {
            console.error('Error fetching or processing user details:', error);
        }
    };

    // Handle image change
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    setUserData((prevData: any) => ({...prevData, image: reader.result}));
                    setIsImageModalOpen(true);
                };
            } catch (error) {
                console.error('Error converting file to base64: ', error);
            }
        }
    };

    // Handle profile update
    const handleProfileUpdate = async () => {
        try {
            const ACCESS_TOKEN = Cookies.get('token');
            const headers = {
                'Content-Type': 'application/json',
                Authorization: ACCESS_TOKEN || '',
            };

            // Update profile details
            await axios.post('http://localhost:8080/api/user/saveUserDetails', userData, {headers});

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully updated profile!',
                showConfirmButton: false,
                timer: 2500,
            });

            navigate('/profile');
        } catch (error) {
            console.error('Error updating profile:', error);

            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error updating profile',
                showConfirmButton: false,
                timer: 2500,
            });
        }
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
                            <div>
                                <img
                                    src={selectedImage}
                                    alt="User Profile"
                                    className="rounded-2xl mx-auto my-4"
                                    style={{maxWidth: '200px', maxHeight: '200px', cursor: 'pointer'}}
                                    onClick={() => setIsImageModalOpen(true)}
                                />
                                {/* Image Modal */}
                                <Modal
                                    isOpen={isImageModalOpen}
                                    onRequestClose={() => setIsImageModalOpen(false)}
                                    style={{
                                        overlay: {
                                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            zIndex: 1000,
                                        },
                                        content: {
                                            maxWidth: '80%',
                                            margin: 'auto',
                                            backgroundColor: 'white',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                        },
                                    }}
                                >
                                    <img alt="User Profile" src={selectedImage}
                                         style={{width: '100%', height: 'auto'}}/>
                                </Modal>
                            </div>
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
                                value={userData.userName}
                                onChange={(e) => handleInput(e, 'userName')}
                            />
                            <input
                                id="email"
                                className="col-span-2 p-2 max-w-4xl mx-2 rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="example@gmail.com"
                                value={userData.email}
                                onChange={(e) => handleInput(e, 'email')}
                                disabled
                            />

                            <input
                                id="address"
                                className="col-span-2 p-2 max-w-4xl mx-2 rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="street address"
                                value={userData.address}
                                onChange={(e) => handleInput(e, 'address')}
                            />
                        </div>
                        <div className="my-1 grid grid-cols-2 gap-4">
                            <input
                                id="postalCode"
                                className="mt-1 p-2 max-w-4xl mx-2 rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="postal code"
                                value={userData.postalCode}
                                onChange={(e) => handleInput(e, 'postalCode')}
                            />
                            <input
                                id="city"
                                className="mt-1 p-2 max-w-4xl mx-2 rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="city"
                                value={userData.city}
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
