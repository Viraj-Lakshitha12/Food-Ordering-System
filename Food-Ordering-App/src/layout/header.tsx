import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {clearAccessToken, selectAccessToken, setAccessToken} from '../auth/authSlice';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import ShoppingCartIcon from '../assets/icons/shoppingCart';
import {useCart} from '../views/dashboard/menu/CartContext';

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
                Cookies.remove('user');
                Cookies.remove('orderId');
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

const DashboardLink: React.FC = () => {
    return <li><Link to="/income">Dashboard</Link></li>;
};

const Header: React.FC<HeaderProps> = () => {
    const accessToken = useSelector(selectAccessToken);
    // @ts-ignore
    const isAdmin = Cookies.get('admin') === 'true' || Cookies.get('admin') === true;

    const {cartCount} = useCart();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Add this line to get the navigate function

    useEffect(() => {
        const token: any = Cookies.get('token');
        dispatch(setAccessToken(token));
    }, [dispatch]);

    const handleCartIconClick = () => {
        if (!accessToken) {
            showAlertBeforeLogin();
        } else {
            // Navigate to /ShoppingCartItems when the cart icon is clicked
            navigate('/ShoppingCartItems');
        }
    };

    const showAlertBeforeLogin = () => {
        Swal.fire({
            title: 'Login Required',
            text: 'Please log in to perform this action.',
            icon: 'info',
            confirmButtonText: 'OK',
        });
    };

    return (
        <header className="flex items-center justify-between my-4 ml-5">
            <div className="flex items-center gap-3">
                <strong className="text-4xl text-red-600 font-bold mb-1">PIZZA</strong>
                {accessToken && (
                    <div className="cursor-pointer flex" onClick={handleCartIconClick}>
                        <ShoppingCartIcon/>
                        {cartCount > 0 && <Link to={'/ShoppingCartItems'}><span
                            className="ml-0.5 text-white text-sm font-semibold bg-red-600 py-1 px-1.5 rounded-xl">{cartCount}</span></Link>}
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
                            {isAdmin && <DashboardLink/>}
                            <LogoutButton/>
                        </>
                    ) : (
                        <>
                            <LoginButton/>
                            {!accessToken && <RegisterButton/>}
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
