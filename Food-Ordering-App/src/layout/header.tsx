
export default function Header(){

        return (
            <header className={'flex items-center justify-between'}>
                <strong className={'text-4xl text-red-600 font-bold p-4'}>PIZZA</strong>
                <nav>
                    <ul className={'flex items-center mx-5 text-gray-500 gap-8 font-semibold'}>
                        <li>Home</li>
                        <li>Menu</li>
                        <li>About</li>
                        <li>Contact</li>
                        <li className={'bg-red-600 text-white px-4 py-2 rounded-full'}>Login</li>
                    </ul>
                </nav>
            </header>
        )
}
