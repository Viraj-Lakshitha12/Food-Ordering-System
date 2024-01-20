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
                    <div className={'bg-gray-200 max-w-xl mx-auto'}>
                        {users.map((user: UsersData) => (
                            <div className={'text-center'}>{user.userName}</div>
                        ))}
                    </div>
                ) : (
                    <p>No users available.</p>
                )}
            </div>
        </section>
    );
}
