import {useCart} from '../dashboard/menu/CartContext.tsx';
import Delete from '../../assets/icons/delete.tsx';
import {Bounce, toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function ShoppingCartItems() {
    const {cartItems, removeFromCart} = useCart();



    useEffect(() => {
        const fetchData = async () => {
            let userEmail = Cookies.get('user');
            const response = await axios.get(`http://localhost:8080/api/user/getUserDetailsByEmail/${userEmail}`);
            const userDetailData = response.data.data;
            console.log(userDetailData);
        }
        fetchData();
    }, []);

    const notify = () => {
        toast('Product was removed');
    };

    const removeCartProduct = (itemId: number) => {
        removeFromCart(itemId);
        notify();
    };

    // Calculate total price
    const total: number = cartItems.reduce((acc, item) => acc + item.price, 0);

    return (
        <section className="mt-8 ml-8 mr-8">
            <div className="text-center text-red-600 mb-8 font-bold text-3xl">
                <h3>Cart</h3>
            </div>
            <div className="gap-4 grid grid-cols-2 pb-8 border-b">
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
                <div className={' p-8 bg-gray-200 rounded-xl'}>
                    <h3 className={'text-xl font-semibold text-center'}>Checkout</h3>
                    <form>
                        <button type={'submit'}
                                className={'w-full text-white bg-red-600 rounded-md py-4 px-24 text-xl'}>Pay
                            ${total}</button>
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
