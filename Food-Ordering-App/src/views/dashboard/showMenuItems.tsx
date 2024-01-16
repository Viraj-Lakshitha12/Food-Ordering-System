import {DashbordNavBar} from "../../components/dashbordNavBar.tsx";
import {Link} from "react-router-dom";
import Right from "../../assets/icons/right.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

interface MenuItem {
    id: string;
    itemName: string;
    description: string;
}

export function ShowMenuItems() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/dashboard/getAllMenuItems');
                setMenuItems(response.data.data);
                console.log("menu items are:", response.data.data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className={'max-w-md mx-auto'}>
            <DashbordNavBar/>
            <div className={'border  border-blue-400 rounded-md p-2 font-semibold mb-5'}>
                <Link to={'/menuItems'} className={'flex gap-4  justify-center'}>
                    Create new menu <Right/>
                </Link>
            </div>

            <div className={''}>
                {menuItems?.length > 0 ? (
                    menuItems.map((item) => (
                        <div className={'border border-gray-400 rounded-md p-1 my-2 text-center'} key={item.id}>
                            <p>{item.itemName}</p>
                            {/*<p>{item.description}</p>*/}
                        </div>
                    ))
                ) : (
                    <p>No menu items available.</p>
                )}
            </div>
        </section>
    );
}
