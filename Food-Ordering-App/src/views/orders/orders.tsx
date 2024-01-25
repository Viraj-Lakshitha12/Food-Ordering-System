import {Dashboard} from "../../components/dashboard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

interface OrderItem {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
}

interface OrderData {
    order: string;
    items: OrderItem[];
    total: number;
    email: string;
    userName: string;
    address: string;
    postalCode: string;
    city: string;
    createdAt: string
}

export function Orders() {
    const [allOrders, setAllOrders] = useState<OrderData[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/order/getAllOrderDetails`).then((r) => {
            const allOrdersData = r.data.data;
            setAllOrders(allOrdersData);
            console.log(allOrders);
        });
    }, []);

    return (
        <section>
            <Dashboard/>
            <div className="max-w-2xl mx-auto">
                {allOrders.map((order) => (
                    <div key={order.order} className="border p-4 mb-4 bg-gray-200 rounded-lg">
                        <div className="flex justify-between text-center">
                            <div className={'grow'}>
                                <div>
                                    <p><span className="font-semibold">order-Id :</span> {order.order}</p>
                                </div>
                                <div>
                                    <p><span className="font-semibold">user email :</span> {order.email}</p>
                                </div>
                                <div>
                                    <p><span className={'font-semibold'}>date :</span> {order.createdAt}</p>
                                </div>
                            </div>
                            <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
                        </div>
                        <div className="my-4">
                            {/*<h1 className={'text-center'}>Product</h1>*/}
                            {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between">
                                    <p ><span className="font-semibold">Item Name :</span> {item.name}</p>
                                    <p ><span className="font-semibold">Price :</span> ${item.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>

    );


}
