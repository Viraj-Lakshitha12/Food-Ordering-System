import Right from "../assets/icons/right.tsx";

export default function Hero() {
    return (
        <section className={'grid grid-cols-2 '}>
            <div className={''}>
                <h1 className={'font-bold text-4xl'}>Everything is better with pizza</h1>
                <p className={'mt-4 text-gray-700'}>
                    Pizza is a missing piece that make everyday complete a simple yet delicious joy in life.
                </p>
                <div className={'flex gap-4 mt-[5vh]'}>
                    <button className={'bg-red-500 text-white rounded-full p-8 py-3 flex gap-2 items-center'}>
                        Order now
                    <Right />
                    </button>
                    <button>Learn more</button>
                </div>
            </div>
            <div className="ml-[7vw] w-[30vw] relative">
                <img src="../assets/images/pizza.png" alt="pizza"/>
            </div>

        </section>
    )
}