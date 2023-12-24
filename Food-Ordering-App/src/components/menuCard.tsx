export default function MenuCard() {
    return (

            <div
                className="col-span-1 mx-auto bg-gray-200 rounded-lg text-center p-2 flex flex-col items-center max-w-[300px]">
                <img className="w-[280px] h-[280px] object-cover rounded-3xl"
                     src="src/assets/images/peparoniPizza.png" alt="pizza"/>
                <h1 className="font-semibold">Pepperoni pizza</h1>
                <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste, quos, veniam. Itaque
                    molestiae recusandae voluptatem!</p>
                <button className="rounded-full bg-red-600 px-8 py-2 m-3 text-center text-white">Add to cart
                </button>
            </div>

    )
}