import {useCart} from '../dashboard/menu/CartContext.tsx';
import Delete from '../../assets/icons/delete.tsx';
import {Bounce, toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ChangeEvent, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

interface UserData {
    userName: string;
    email: string;
    address: string;
    postalCode: string;
    city: string;
}

export default function ShoppingCartItems() {
    const {cartItems, removeFromCart} = useCart();
    const [userData, setUserData] = useState<UserData>({
        userName: '',
        email: '',
        address: '',
        postalCode: '',
        city: '',
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement>, type: keyof UserData): void => {
        setUserData((prevData) => ({...prevData, [type]: e.target.value}));
    };


    const fetchData = async () => {
        try {
            let userEmail = Cookies.get('user');
            const response = await axios.get(`http://localhost:8080/api/user/getUserDetailsByEmail/${userEmail}`);
            const userDetailData = response.data.data;

            // Set user details in the state
            setUserData({
                userName: userDetailData.userName,
                email: userDetailData.email,
                address: userDetailData.address,
                postalCode: userDetailData.postalCode,
                city: userDetailData.city,
            });
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };


    const notify = () => {
        toast('Product was removed');
    };

    const removeCartProduct = (itemId: number) => {
        removeFromCart(itemId);
        notify();
    };

    // Calculate total price
    const total: number = cartItems.reduce((acc, item) => acc + item.price, 0);
    {
        total > 0 ? fetchData() : null
    }

    function handlePayButton(e: any): void {
        e.preventDefault();
        console.log("Request payload:", {cartItems, userData});

        axios.post('http://localhost:8080/api/order/saveOrder', {cartItems, userData})
            .then(r => {
                console.log("Response:", r);
                Swal.fire({
                    title: "Order Placed!",
                    text: "Your order has been successfully placed.",
                    icon: "success"
                });
                setTimeout(() => {
                    window.location.reload();
                }, 200);

            })
            .catch(error => {
                console.error("Error:", error);
                Swal.fire({
                    title: "Order Failed!",
                    text: "Something went wrong while placing the order. Please try again.",
                    icon: "error"
                });
            });
    }


    return (
        <section className="mt-8 ml-8 mr-8">
            <div className="text-center text-red-600 mb-8 font-bold text-3xl">
                <h3>Cart</h3>
            </div>
            <div className="gap-16 grid grid-cols-2 pb-8 border-b">
                <div>
                    {cartItems?.length === 0 ? 'No Product item Available' : cartItems?.map((item) => (
                        <div className="flex gap-16 mt-4 pb-2 items-center border-b" key={item.id}>
                            <div className="w-20">
                                <img src={item.image} alt="pizza" width={100} height={100}/>
                            </div>
                            <div className="font-semibold text-lg grow">
                                <p>{item.name}</p>
                            </div>
                            <div className="text-xl font-semibold">
                                <p>{item.price + '$'}</p>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        removeCartProduct(item.id);
                                    }}
                                    className="font-semibold shadow border-2 items-center px-4 py-2 bg-white rounded-xl"
                                >
                                    <Delete/>
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="text-right text-2xl mt-4 font-semibold">
                        Total: ${total.toFixed(2)}
                    </div>
                </div>
                <div className={' p-8 bg-gray-100 rounded-xl'}>
                    <h3 className={'text-2xl text-red-600 font-bold text-center'}>Checkout</h3>

                    <form className="flex flex-col items-center">
                        <div className="my-2 ml-10 grid gap-5 min-w-full items-center">
                            <input
                                id="firstName"
                                className="col-span-2 p-2 my-1 max-w-xl mx-2 border-gray-400 border-2 rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="First and last name"
                                value={userData.userName}
                                onChange={(e) => handleInput(e, 'userName')}
                            />
                            <input
                                id="email"
                                className="col-span-2 p-2 max-w-xl mx-2 border-solid border-gray-400 border-2 rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="example@gmail.com"
                                value={userData.email}
                                onChange={(e) => handleInput(e, 'email')}
                                disabled
                            />
                            <input
                                id="address"
                                className="col-span-2 p-2 max-w-xl mx-2 rounded-md bg-gray-200 border-gray-400 border-2 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="street address"
                                value={userData.address}
                                onChange={(e) => handleInput(e, 'address')}
                            />
                        </div>
                        <div className="my-1 mt-2 grid grid-cols-2 gap-5 mr-12">
                            <input
                                id="postalCode"
                                className="mt-1 p-2 max-w-sm  rounded-md bg-gray-200 text-black border-gray-400 border-2 font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="postal code"
                                value={userData.postalCode}
                                onChange={(e) => handleInput(e, 'postalCode')}
                            />
                            <input
                                id="city"
                                className="mt-1 p-2 max-w-sm rounded-md bg-gray-200 text-black border-gray-400 border-2 font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="city"
                                value={userData.city}
                                onChange={(e) => handleInput(e, 'city')}
                            />
                        </div>
                        <div className={'mt-4 items-center max-w-full'}>
                            <button
                                type="submit"
                                onClick={handlePayButton}

                                className="text-white bg-red-600 rounded-md py-2 mr-8 px-24 text-xl">
                                Pay ${total}
                            </button>

                        </div>

                    </form>


                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
        </section>
    );
}
