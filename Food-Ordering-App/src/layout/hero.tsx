import Right from "../assets/icons/right.tsx";


export default function Hero() {

    function handleOrderNowButton() {

    }

    return (
        <section className={'grid sm:grid-cols-1 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 p-14 leading-10'}>
            <div className={'p-8 mt-[4vh] '}>
                <h1 className={'font-bold text-6xl '}>Everything is better<br/> with
                    a <span className={'text-red-600'}>
                    pizza
                </span></h1>
                <p className={'my-4 text-gray-700 text-2xl'}>
                    Pizza is a missing piece that make everyday complete a simple yet delicious joy in life.
                </p>
                <div className={'flex gap-4 mt-[5vh] font-bold'}>
                    <button
                    onClick={handleOrderNowButton}
                        className={'bg-red-500 text-white rounded-full p-8 py-3 flex gap-2 items-center'}>
                        ORDER NOW
                        <Right/>
                    </button>
                    <button className={'flex gap-2 py-3 text-gray-700 items-center'}>
                        Learn more
                        <Right/>
                    </button>
                </div>
            </div>
            <div className="ml-[5vw] w-[35vw] relative">
                <img src={"src/assets/images/pizza.png"} alt="pizza"/>
            </div>

        </section>
    )
}
