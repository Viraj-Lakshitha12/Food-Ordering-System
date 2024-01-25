import {useEffect} from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function ViewOrder() {
    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        let orderId = Cookies.get('orderId');
        await axios.get(`http://localhost:8080/api/order/getOrderDetails/${orderId}`).then(r => {
            console.log(r.data.data);
        });
    }

    return (
        <section className={'my-16'}>
            <div className={'text-4xl text-center font-semibold text-red-600 italic'}>Your Order</div>
            <div className={'text-center font-semibold text-xl italic'}>Thanks for your order.</div>
        </section>
    );
}
