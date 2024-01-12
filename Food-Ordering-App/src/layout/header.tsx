// components/Header.tsx

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAccessToken, selectAccessToken, setAccessToken } from '../auth/authSlice';
import Cookies from 'js-cookie';
import React from 'react';

const LoginButton: React.FC = () => {
    return (
        <li>
            <Link to="/login">Login</Link>
        </li>
    );
};

const RegisterButton: React.FC = () => {
    return (
        <li className="bg-red-600 text-white px-4 py-2 rounded-full">
            <Link to="/register">Register</Link>
        </li>
    );
};

const LogoutButton: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token');
        dispatch(clearAccessToken());
        navigate('/login');
    };

    return (
        <li className="bg-red-600 text-white px-4 py-2 rounded-full" onClick={handleLogout}>
            Logout
        </li>
    );
};

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);

    React.useEffect(() => {
        // Get token
        const token: any = Cookies.get('token');
        dispatch(setAccessToken(token));
    }, [dispatch]);

    return (
        <header className="flex items-center justify-between">
            <strong className="text-4xl text-red-600 font-bold p-4">PIZZA</strong>
            <nav>
                <ul className="flex items-center mx-5 text-gray-500 text-lg gap-10 font-semibold">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/menu">Menu</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    {accessToken ? (
                        <LogoutButton />
                    ) : (
                        <>
                            <LoginButton />
                            {!accessToken && <RegisterButton />}
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
