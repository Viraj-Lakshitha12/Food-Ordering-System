import {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

const MenuCard = ({itemName, description, image, price}: any) => {
    const [cartIcon, setCartIcon] = useState(false);

    useEffect(() => {
        console.log('Cart Icon Updated:', cartIcon);
    }, [cartIcon]);

    const addToCart = () => {
        const data = {
            itemName: itemName,
            description: description,
            image: image,
            price: price,
        };
        Cookies.set('cartIcon', String(true));
        setCartIcon(true);
        console.log(data);
    };

    return (
        <div
            className="hover:shadow-black hover:bg-white transition-all hover:shadow-2xl col-span-1 mx-auto bg-gray-200 rounded-lg text-center p-2 items-center max-w-[350px] grid grid-rows-1">
            <img className="w-[320px] items-center h-[300px] object-cover rounded-3xl" src={image} alt="pizza"/>

            <h1 className="font-semibold text-xl mt-2">{itemName}</h1>
            <p className="text-gray-500 line-clamp-2 my-2">{description}</p>
            <p className="text-gray-500 font-bold text-4xl my-2">{price}$</p>
            <button
                onClick={addToCart}
                className="rounded-full bg-red-600 px-8 font-semibold py-3 m-3 text-center text-white text-xl"
            >
                Add to cart
            </button>
        </div>
    );
};

export default MenuCard;
