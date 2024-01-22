import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {clearAccessToken, selectAccessToken, setAccessToken} from '../auth/authSlice';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import ShoppingCartIcon from '../assets/icons/shoppingCart';

interface HeaderProps {
}

const LoginButton: React.FC = () => {
    return <li><Link to="/login">Login</Link></li>;
};

const RegisterButton: React.FC = () => {
    return <li className="bg-red-600 text-white px-4 py-2 rounded-full"><Link to="/register">Register</Link></li>;
};

const LogoutButton: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure you want to logout?',
            text: "You won't be able to revert this!",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Logged Out!',
                    text: 'You have been successfully logged out.',
                    icon: 'success',
                });

                Cookies.remove('token');
                Cookies.remove('admin');
                dispatch(clearAccessToken());
                navigate('/login');
            }
        });
    };

    return <li className="bg-red-600 text-white px-4 py-2 rounded-full cursor-pointer"
               onClick={handleLogout}>Logout</li>;
};

const ProfileLink: React.FC = () => {
    return <li><Link to="/profile">Profile</Link></li>;
};

const Dashboard: React.FC = () => {
    return <li><Link to="/dashboard">Dashboard</Link></li>;
};

const Header: React.FC<HeaderProps> = () => {
    const [cartIconShow, setCartIconShow] = useState(false);
    // @ts-ignore
    const [showAlert, setShowAlert] = useState(false);

    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);
    // @ts-ignore
    const isAdmin = Cookies.get('admin') === 'true' || Cookies.get('admin') === true;

    useEffect(() => {
        const token: any = Cookies.get('token');
        const isAdmin: any = Cookies.get('admin');
        console.log(isAdmin);
        // @ts-ignore
        const storedCartIcon = Cookies.get('cartIcon') === 'true' || Cookies.get('cartIcon') === true;
        setCartIconShow(storedCartIcon);
        dispatch(setAccessToken(token));
    }, [dispatch]);

    useEffect(() => {
        if (showAlert) {
            showAlertAfterAction();
        }
    }, [showAlert]);

    const showAlertBeforeLogin = () => {
        if (!accessToken) {
            Swal.fire({
                title: 'Login Required',
                text: 'Please log in to perform this action.',
                icon: 'info',
                confirmButtonText: 'OK',
            });
        }
    };

    const showAlertAfterAction = () => {
        Swal.fire({
            title: 'Action Successful',
            text: 'Your action was successful!',
            icon: 'success',
            confirmButtonText: 'OK',
        });
    };

    return (
        <header className="flex items-center justify-between my-4 ml-5">
            <div className="flex items-center gap-3">
                <strong className="text-4xl text-red-600 font-bold mb-1">PIZZA</strong>
                {accessToken && (
                    <div className="cursor-pointer" onClick={() => showAlertBeforeLogin()}>
                        {cartIconShow && <ShoppingCartIcon/>}
                    </div>
                )}
            </div>
            <nav>
                <ul className="flex items-center mx-5 text-gray-500 text-lg gap-10 font-semibold">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/menu">Menu</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>

                    {accessToken ? (
                        <>
                            <ProfileLink/>
                            {isAdmin && <Dashboard/>}
                            <LogoutButton/>
                        </>
                    ) : (
                        <>
                            <LoginButton
                                //@ts-ignore
                                onClick={() => showAlertBeforeLogin()}/>
                            {!accessToken && <RegisterButton/>}
                        </>

                    )}
                </ul>
            </nav>
            {/* {showAlert && showAlertAfterAction()} */}
        </header>
    );
};

export default Header;
