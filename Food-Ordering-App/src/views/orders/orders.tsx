import {Dashboard} from "../../components/dashboard.tsx";
import {useEffect} from "react";
import axios from "axios";

export function Orders() {

    const email="viraj.lakshitha.22222@gmail.com"
    const date='2024-01-23'

    useEffect(() => {
        axios.get(' http://localhost:3000/api/order/')
    }, []);
    return (
        <section>
            <Dashboard/>
            orders
        </section>
    );
}
