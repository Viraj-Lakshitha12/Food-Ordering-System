import {DashbordNavBar} from "../../../components/dashbordNavBar.tsx";
import {Link, useNavigate} from "react-router-dom";
import Right from "../../../assets/icons/right.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface MenuItem {
    id: string;
    itemName: string;
    description: string;
    image: string;
    price: string
}

export function ShowMenuItems() {
    const navigate = useNavigate();
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

    function handleOnClick(itemName: any) {
        // console.log(itemName);
        Cookies.set('itemName', itemName);
        navigate('/updateMenuItems');
    }

    return (
        <section>
            <DashbordNavBar/>
            <div className={'max-w-lg mx-auto border  border-blue-400 rounded-md p-2 font-semibold mb-5'}>
                <Link to={'/menuItems'} className={'flex gap-4  justify-center'}>
                    Create new menu <Right/>
                </Link>
            </div>
            <section className={'max-w-3xl mx-auto'}>
                <div className={'grid grid-cols-4 grid-rows-1 gap-4 overflow-x-scroll'}>

                    {menuItems?.length > 0 ? (
                        menuItems.map((item) => (
                            <div
                                className={'border bg-gray-100 border-gray-400 rounded-md p-1  text-center grid grid-rows-1 max-w-lg max-h-[200px]'}
                                key={item.id}>
                                <div className={'font-semibold'}>{item.itemName}</div>
                                <div className={'relative flex justify-center max-w-[80px] max-h-[80px] mx-auto'}
                                     onClick={() => handleOnClick(item.itemName)}>
                                    {item.image && <img src={item.image} alt={'image'} width={80} height={80}/>}
                                </div>
                                <div className={'font-semibold'}>{item.price + "$"}</div>
                            </div>
                        ))
                    ) : (
                        <p>No menu items available.</p>
                    )}
                </div>

            </section>
        </section>

    );
}
