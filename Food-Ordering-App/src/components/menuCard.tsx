export default function MenuCard() {
    return (
        <div className="hover:shadow-black hover:bg-white transition-all hover:shadow-2xl col-span-1 mx-auto bg-gray-200 rounded-lg text-center p-2 flex flex-col items-center max-w-[300px]">
            <img className="w-[280px] h-[280px] object-cover rounded-3xl"
                 src="src/assets/images/peparoniPizza.png" alt="pizza"/>
            <h1 className="font-semibold text-xl">Pepperoni pizza</h1>
            <p className=""> A classic favorite with pepperoni and savory flavors. Perfect for pizza enthusiasts!</p>
            <button className="rounded-full bg-red-600 px-8 py-2 m-3 text-center text-white">Add to cart
            </button>
        </div>

    )
}