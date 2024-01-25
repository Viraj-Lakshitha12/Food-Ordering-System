import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";


interface OrderItem {
    order: string,
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
}

interface OrderData {
    orderId: string;
    items: OrderItem[];
    total: number;
    email: string;
    userName: string;
    address: string;
    postalCode: string;
    city: string;
}

export default function ViewOrder() {
    const [order, setOrder] = useState<OrderData | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let orderId = Cookies.get("orderId");
        try {
            const response = await axios.get(
                `http://localhost:8080/api/order/getOrderDetails/${orderId}`
            );
            setOrder(response.data.data);

        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>,) => {
        e.preventDefault();
    };

    return (
        <section className={"my-16"}>
            <div className={'text-4xl text-center font-semibold text-red-600 italic'}>Your Order</div>
            <div className={'text-center font-semibold text-xl italic'}>Thanks for your order.</div>

            <div className="gap-16 grid grid-cols-2 pb-8 mt-8 border-b">
                <div>
                    {order?.items.length === 0 ? (
                        'No Product items Available'
                    ) : (
                        order?.items.map((item) => (
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
                                <div className={'font-semibold'}>
                                   <span className={'font-bold'}>Order ID : </span >{Cookies.get('orderId')} {/* Display the order ID */}
                                </div>
                            </div>
                        ))
                    )}
                    <div className="text-right text-2xl mt-4 font-semibold">
                        Total: ${order?.total.toFixed(2)}
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
                                value={order?.userName}
                                onChange={(e) => handleInput(e)}
                            />
                            <input
                                id="email"
                                className="col-span-2 p-2 max-w-xl mx-2 border-solid border-gray-400 border-2 rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="example@gmail.com"
                                value={order?.email}
                                onChange={(e) => handleInput(e)}
                                disabled
                            />
                            <input
                                id="address"
                                className="col-span-2 p-2 max-w-xl mx-2 rounded-md bg-gray-200 border-gray-400 border-2 text-black font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="street address"
                                value={order?.address}
                                onChange={(e) => handleInput(e)}
                            />
                        </div>
                        <div className="my-1 mt-2 grid grid-cols-2 gap-5 mr-12">
                            <input
                                id="postalCode"
                                className="mt-1 p-2 max-w-sm  rounded-md bg-gray-200 text-black border-gray-400 border-2 font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="postal code"
                                value={order?.postalCode}
                                onChange={(e) => handleInput(e,)}
                            />
                            <input
                                id="city"
                                className="mt-1 p-2 max-w-sm rounded-md bg-gray-200 text-black border-gray-400 border-2 font-semibold hover:border-2 hover:border-blue-800 text-center"
                                type="text"
                                placeholder="city"
                                value={order?.city}
                                onChange={(e) => handleInput(e,)}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
