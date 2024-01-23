import {Dashboard} from "../../components/dashboard.tsx";
import {useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function Orders() {

    useEffect(() => {
        let email = Cookies.get('user');
        axios.get(`http://localhost:8080/api/order/getAllOrdersByEmailAndDate/${email}`).then(r => {
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
