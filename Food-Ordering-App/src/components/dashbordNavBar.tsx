import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function DashbordNavBar() {
    const location = useLocation();

    return (
        <section>
            <div className="flex items-center justify-center flex-col">
                <div className="text-center">
                    <strong className="text-4xl text-red-600 font-bold my-7">DASHBOARD</strong>
                </div>
                <nav>
                    <ul className="flex mx-5 text-gray-500 text-lg gap-6 font-semibold my-7">
                        <li className={`bg-gray-300 text-black rounded-2xl p-2 px-5 ${location.pathname === '/categories' ? 'bg-red-500' : ''}`}>
                            <Link to="/categories">Categories</Link>
                        </li>
                        <li className={`bg-gray-300 text-black rounded-2xl p-2 px-5 ${location.pathname === '/menuItems' ? 'bg-red-500' : ''}`}>
                            <Link to="/menuItems">Menu Items</Link>
                        </li>
                        <li className={`bg-gray-300 text-black rounded-2xl p-2 px-5 ${location.pathname === '/users' ? 'bg-red-500' : ''}`}>
                            <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}
