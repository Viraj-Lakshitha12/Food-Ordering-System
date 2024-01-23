import {Dashboard} from "../../components/dashboard.tsx";
import {useEffect} from "react";
import axios from "axios";

export function Orders() {

    useEffect(() => {
        axios.get(`http://localhost:8080/api/order/getAllOrdersByEmailAndDate/viraj.lakshitha.22222@gmail.com`).then(r => {
            console.log(r.data);
        })
    }, []);
    return (
        <section>
            <Dashboard/>
            orders
        </section>
    );
}
