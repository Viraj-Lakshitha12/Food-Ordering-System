import {Link} from "react-router-dom";

export function Dashboard() {
    return (
        <section>
            <div className="flex items-center justify-center flex-col">
                <div className="text-center">
                    <strong className="text-4xl text-red-600  font-bold my-7">DASHBOARD</strong>
                </div>
                <nav>
                    <ul className="flex mx-5 text-gray-500 text-lg gap-10 font-semibold my-7">
                        <li>
                            <Link to="/categories">Categories</Link>
                        </li>
                        <li>
                            <Link to="/menuItems">Menu Items</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}
