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
                    <div key={order.order} className="border p-4 mb-4">
                        <div className="flex justify-between text-center">
                            <div>
                                <p className="font-semibold">Order ID: {order.order}</p>
                                <p className="font-semibold">User Email: {order.email}</p>
                                <p className="font-semibold">Date: {order.createdAt}</p>
                            </div>
                            <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
                        </div>
                        <div className="mt-4">
                            {/* Iterate over all items in the order */}
                            {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between">
                                    <p className="font-semibold">Item Name: {item.name}</p>
                                    <p className="font-semibold">Price: ${item.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>

    );


}
