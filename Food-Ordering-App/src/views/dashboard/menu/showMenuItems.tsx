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
        <section className={'max-w-md mx-auto'}>
            <DashbordNavBar/>
            <div className={'border  border-blue-400 rounded-md p-2 font-semibold mb-5'}>
                <Link to={'/menuItems'} className={'flex gap-4  justify-center'}>
                    Create new menu <Right/>
                </Link>
            </div>

            <div className={'grid grid-cols-3 grid-rows-1 gap-4 overflow-x-scroll'}>

                {menuItems?.length > 0 ? (
                    menuItems.map((item) => (
                        <div className={'border border-gray-400 rounded-md p-1 my-1 text-center flex flex-col'}
                             key={item.id}>
                            <div className={'font-semibold'}>{item.itemName}</div>
                            <div className={'relative flex justify-center'}
                                 onClick={() => handleOnClick(item.itemName)}>
                                {item.image && <img src={item.image} alt={'image'} width={80} height={80}/>}
                            </div>

                        </div>
                    ))
                ) : (
                    <p>No menu items available.</p>
                )}
            </div>

        </section>
    );
}
