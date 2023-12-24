export default function HomeMenu() {
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

            <div className="grid grid-cols-3 gap-4 p-8">
                <div
                    className="col-span-1 mx-auto bg-gray-200 rounded-lg text-center p-2 flex flex-col items-center max-w-[300px]">
                    <img className="w-[180px] h-[180px] object-cover rounded-3xl"
                         src="src/assets/images/peparoniPizza.jpg" alt="pizza"/>
                    <h1 className="font-semibold">Pepperoni pizza</h1>
                    <p className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste, quos, veniam. Itaque
                        molestiae recusandae voluptatem!</p>
                    <button className="rounded-full bg-red-600 px-5 py-3 m-3 text-center text-white">Add to cart
                    </button>
                </div>
            </div>

        </section>
    )
}