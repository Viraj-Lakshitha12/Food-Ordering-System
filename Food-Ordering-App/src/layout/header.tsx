import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Header() {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        // Get token
        const token:any = Cookies.get("token");
        setAccessToken(token);
    }, []);

    function handleLogout() {
        Cookies.remove("token");
        setAccessToken(null);
        navigate("/login"); // Redirect to the login page
    }

    return (
        <header className={'flex items-center justify-between'}>
            <strong className={'text-4xl text-red-600 font-bold p-4'}>PIZZA</strong>
            <nav>
                <ul className={'flex items-center mx-5 text-gray-500 text-lg gap-10 font-semibold'}>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/menu'}>Menu</Link></li>
                    <li><Link to={'/about'}>About</Link></li>
                    <li><Link to={'/contact'}>Contact</Link></li>
                    {!accessToken ? (
                        <li className={'bg-red-600 text-white px-4 py-2 rounded-full'} onClick={handleLogout}>
                            Logout
                        </li>
                    ) : (
                        <>
                            <li><Link to={'/login'}>Login</Link></li>
                            <li className={'bg-red-600 text-white px-4 py-2 rounded-full'}>
                                <Link to={'/register'}>Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
