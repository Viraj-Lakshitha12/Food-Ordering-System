import {Link} from "react-router-dom";

export default function Header(){

        return (
            <header className={'flex items-center justify-between'}>
                <strong className={'text-4xl text-red-600 font-bold p-4'}>PIZZA</strong>
                <nav>
                    <ul className={'flex items-center mx-5 text-gray-500 text-xl gap-10 font-semibold'}>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/menu'}>Menu</Link></li>
                        <li><Link to={'/about'}>About</Link></li>
                        <li><Link to={'/contact'}>Contact</Link></li>
                        <li className={''} ><Link to={'/login'}>Login</Link></li>
                        <li className={'bg-red-600 text-white px-4 py-2 rounded-full'}><Link to={'/register'}>Register</Link> </li>
                    </ul>
                </nav>
            </header>
        )
}
