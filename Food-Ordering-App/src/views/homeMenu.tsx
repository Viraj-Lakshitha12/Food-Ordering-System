import MenuCard from "../components/menuCard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

interface MenuItem {
    id: string;
    itemName: string;
    description: string;
    image: string;
    price: string;
}

export default function HomeMenu() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/dashboard/getAllMenuItems');
                setMenuItems(response.data.data);
                console.log('menu items are:', menuItems);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section>
            <div className="absolute left-0 right-0 w-full justify-start">
                <div className="absolute left-0 -top-[130px] text-left -z-10">
                    <img src={'/src/assets/images/sallad1.png'} width={109} height={189} alt={'sallad'}/>
                </div>
                <div className="absolute -top-[100px] right-0 -z-10">
                    <img src={'src/assets/images/sallad2.png'} width={107} height={195} alt={'sallad'}/>
                </div>
            </div>

            <div className={'text-center text-gray-500 font-semibold text-xl'}>
                <h3>CHECK OUT</h3>
                <h2 className={'font-bold text-red-600 text-4xl italic'}>Menu</h2>
            </div>

            <div className="flex overflow-x-auto p-8">
                <div className="grid grid-cols-4 gap-16">
                    {menuItems.map((menuItem, index) => (
                        <MenuCard
                            key={index}
                            itemName={menuItem.itemName}
                            description={menuItem.description}
                            image={menuItem.image}
                            //@ts-ignore
                            price={menuItem.price}
                         id={index}/>
                    ))}
                </div>
            </div>

        </section>
    )
}
