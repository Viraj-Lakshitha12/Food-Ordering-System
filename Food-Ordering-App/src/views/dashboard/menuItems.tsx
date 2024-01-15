import {Dashboard} from "../../components/dashboard.tsx";
import Cookies from "js-cookie";

export function MenuItems() {
    // @ts-ignore
    const isAdmin = Cookies.get('admin') === 'true' || Cookies.get('admin') === true;

    console.log("isAdmin Check: ", isAdmin);

    if (!isAdmin) {
        console.log("Alert Triggered");
        alert("Access denied. You are not an admin.");
        return null;
    }

    return (
        <section>
            <Dashboard/>
            <h1>Menu Items</h1>
        </section>
    );
}
