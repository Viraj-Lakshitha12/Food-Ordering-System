import {DashbordNavBar} from "./dashbordNavBar.tsx";
import Cookies from "js-cookie";

export function Dashboard() {
    // @ts-ignore
    const isAdmin = Cookies.get('admin') === 'true' || Cookies.get('admin') === true;

    if (!isAdmin) {
        alert("Access denied. You are not an admin.");
        return null;
    }

    return (
        <section>
            <DashbordNavBar/>
        </section>
    );
}
