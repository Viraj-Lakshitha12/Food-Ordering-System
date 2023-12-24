import Right from "../assets/icons/right.tsx";

export default function Hero() {
    return (
        <section className={'grid grid-cols-2 p-14 items-center'}>
            <div className={'p-8'}>
                <h1 className={'font-bold text-4xl'}>Everything is better with
                    a <span className={'text-red-600'}>
                    pizza
                </span></h1>
                <p className={'my-4 text-gray-700'}>
                    Pizza is a missing piece that make everyday complete a simple yet delicious joy in life.
                </p>
                <div className={'flex gap-4 mt-[5vh] font-bold'}>
                    <button className={'bg-red-500 text-white rounded-full p-8 py-3 flex gap-2 items-center'}>
                        ORDER NOW
                    <Right />
                    </button>
                    <button className={'flex gap-2 py-3 text-gray-700 items-center'}>
                        Learn more
                        <Right />
                    </button>
                </div>
            </div>
            <div className="ml-[5vw] w-[35vw] relative">
                <img src="src/assets/images/pizza.png" alt="pizza"/>
            </div>

        </section>
    )
}