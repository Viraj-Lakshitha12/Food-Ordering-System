import {DashbordNavBar} from "../../components/dashbordNavBar.tsx";
import {Link} from "react-router-dom";
import Right from "../../assets/icons/right.tsx";

export function ShowMenuItems() {
    return (
        <section className={'max-w-md mx-auto'}>
            <DashbordNavBar/>
            <div className={'border  border-blue-700 rounded-md p-1 font-bold bg-gray-200  mb-20'}>
                <Link to={'/menuItems'} className={'flex gap-4  justify-center'}>Create new menu
                    <Right/>
                </Link>
            </div>


        </section>
    );
}
