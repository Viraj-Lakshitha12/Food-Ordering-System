import { DashbordNavBar } from "../../components/dashbordNavBar.tsx";
import { Link } from "react-router-dom";
import Right from "../../assets/icons/right.tsx";
import { useEffect, useState } from "react";
import axios from "axios";

interface MenuItem {
    id: string;
    name: string;
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
            <DashbordNavBar />
            <div className={'border  border-blue-700 rounded-md p-1 font-bold bg-gray-200  mb-5'}>
                <Link to={'/menuItems'} className={'flex gap-4  justify-center'}>
                    Create new menu <Right />
                </Link>
            </div>

            <div>
                {menuItems?.length > 0 ? (
                    menuItems.map((item) => (
                        <div key={item.id}>
                            <p>{item.name}</p>
                            <p>{item.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No menu items available.</p>
                )}
            </div>
        </section>
    );
}
