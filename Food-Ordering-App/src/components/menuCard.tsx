import React from 'react';

interface Data {
    name: string;
    content: string;
    price: string;
}

interface MenuCardProps {
    numberOfCards: number;
}

const data: Data[] = [
    {
        name: 'Pepperoni pizza',
        content: 'A classic favorite with pepperoni and savory flavors. Perfect for pizza enthusiasts!',
        price: '15$'
    },
    {
        name: 'Peporoni Pizza',
        content: 'lorem',
        price: '15$'
    },
    {
        name: 'Peporoni Pizza',
        content: 'lorem',
        price: '15$'
    },
    {
        name: 'Peporoni Pizza',
        content: 'lorem',
        price: '15$'
    },
    {
        name: 'Peporoni Pizza',
        content: 'lorem',
        price: '15$'
    },
];

const MenuCard: React.FC<MenuCardProps> = ({numberOfCards}) => {
    const limitedData = data.slice(0, numberOfCards);

    return (
        <>
            {limitedData.map((pizza: Data, index: number) => (
                <div
                    key={index}
                    className="hover:shadow-black hover:bg-white transition-all hover:shadow-2xl col-span-1 mx-auto bg-gray-200 rounded-lg text-center p-2 flex flex-col items-center max-w-[300px]"
                >
                    <img className="w-[280px] h-[280px] object-cover rounded-3xl" src={"src/assets/images/pizza.png"}
                         alt="pizza"/>

                    <h1 className="font-semibold text-xl">{pizza.name}</h1>
                    <p className="text-gray-500">{pizza.content}</p>
                    <p className="text-gray-500 font-bold text-4xl p-2">{pizza.price}</p>
                    <button className="rounded-full bg-red-600 px-8 font-semibold py-3 m-3 text-center text-white text-xl">Add to cart
                    </button>
                </div>
            ))}
        </>
    );
};

export default MenuCard;
