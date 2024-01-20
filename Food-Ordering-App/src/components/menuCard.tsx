export default function MenuCard({itemName, description, image, price}: any) {

    return (
        <>
            <div
                className="hover:shadow-black hover:bg-white transition-all hover:shadow-2xl col-span-1 mx-auto
                 bg-gray-200 rounded-lg text-center p-2 items-center max-w-[300px] grid grid-rows-1"
            >
                <img className="w-[280px] h-[280px] object-cover rounded-3xl" src={image}
                     alt="pizza"/>

                <h1 className="font-semibold text-xl">{itemName}</h1>
                <p className="text-gray-500">{description}</p>
                <p className="text-gray-500 font-bold text-4xl p-2">{price}$</p>
                <button
                    className="rounded-full bg-red-600 px-8 font-semibold py-3 m-3 text-center text-white text-xl">Add
                    to cart
                </button>
            </div>

        </>
    );
};

