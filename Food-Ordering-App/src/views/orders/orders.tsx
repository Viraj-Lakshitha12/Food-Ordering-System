import {Dashboard} from "../../components/dashboard.tsx";
import {useEffect} from "react";
import axios from "axios";

export function Orders() {

    useEffect(() => {
        axios.get(`http://localhost:8080/api/order/getAllOrderDetails`).then(r => {
            console.log(r.data.data);
        })
    }, []);
    return (
        <section>
            <Dashboard/>
            orders
        </section>
    );
}
