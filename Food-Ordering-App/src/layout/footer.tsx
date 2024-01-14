export default function Footer() {
    return (
        <div>
            <footer className={'bg-teal-950 text-white p-5'}>
                <img src={"src/assets/images/pizza.png"} title="logo" alt="logo" className={'w-[100px]'}/>
                <ul className={'mt-5'}>
                    <li>123D, Flower Rd, Colombo</li>
                    <li>+94 76 722 3131</li>
                    <li>+94 38 722 3131</li>
                    <li>info@pizza.lk</li>
                </ul>
                <div className={'mt-5 text-center'}>Copyright © 2024 pizza LK</div>
            </footer>
        </div>
    )
}
