import React from 'react';
import {Dashboard} from '../../components/dashboard.tsx';
import axios from 'axios';

interface UsersData {
    userName: string;
    email: string;
    address: string;
    postalCode: string;
    city: string;
    admin: boolean;
    image?: File | null | string;
}

export function Users() {
    const [users, setUsers] = React.useState<UsersData[]>([]);

    React.useEffect(() => {
        axios
            .get('http://localhost:8080/api/user/getAllUserDetails')
            .then((response) => {
                setUsers(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <section>
            <Dashboard/>
            <div>
                <h2 className={'text-center text-xl font-semibold'}>User List</h2>
                {users.length > 0 ? (
                    <div className={'bg-gray-200 p-2 rounded-md max-w-xl mx-auto my-4'}>
                        {users.map((user: UsersData, index) => (
                            <div key={index} className={'flex gap-4 justify-between items-center text-center my-4'}>
                                <div className={'flex gap-4'}>
                                    <div><span className={'font-semibold'}>User Name : </span>{user.userName}</div>
                                    <div><span className={'font-semibold'}>Email : </span>{user.email}</div>
                                </div>
                                <button className={'shadow border-2 px-10 bg-white py-1 rounded-md'}>Edit</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No users available.</p>
                )}
            </div>
        </section>
    );

}
