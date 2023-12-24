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
        </section>

    )
}