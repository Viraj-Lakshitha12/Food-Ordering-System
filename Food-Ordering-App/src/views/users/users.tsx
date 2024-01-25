import React from 'react';
import {Dashboard} from '../../components/dashboard.tsx';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();
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

    function handlerEditUser() {
        navigate('/profile')
    }

    return (
        <section>
            <Dashboard/>
            <div>
                <h2 className={'text-center text-xl font-semibold'}>User List</h2>
                <div className={'max-w-3xl mx-auto my-5'}>
                    {users?.length > 0 &&
                        users.map((c) => (
                            <div className="flex my-1 bg-gray-200 rounded-lg p-2 ">
                                <div className="grow  font-semibold grid grid-cols-3 ">
                                    <span>{c.userName}</span>
                                    <span>{c.email}</span>

                                </div>

                                <div className={'flex gap-1 '}>
                                    <button
                                        className={'px-4 py-1 rounded-xl bg-white'}
                                        onClick={ handlerEditUser}
                                        type={"button"}>
                                        Edit
                                    </button>
                                    <button
                                        className={'px-4 py-1 rounded-xl bg-white'}
                                        type={"button"}
                                        // onClick={() => deleteCategory(c._id)}
                                    >Delete
                                    </button>
                                </div>
                            </div>

                        ))}
                </div>

            </div>
        </section>
    );

}
