import React from 'react';
import {Dashboard} from '../../components/dashboard.tsx';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

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

    async function deleteCategory(email: any) {
        // Show confirmation alert
        const result = await Swal.fire({
            title: 'Are you sure you want to delete this user?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            showConfirmButton: true,
        });

        if (result.isConfirmed) {
            // User confirmed deletion, now delete the user
            try {
                console.log("ok delete");
                const response = await axios.delete(`http://localhost:8080/api/user/deleteUser/${email}`);
                console.log(response);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'The user has been deleted.',
                    icon: 'success',
                });
               setTimeout(()=>{
                   window.location.reload();
               },2000)
            } catch (error) {
                console.error('Error deleting user:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while deleting the user.',
                    icon: 'error',
                });
            }
        } else {
            // User canceled deletion
            Swal.fire({
                title: 'Cancelled',
                text: 'Deletion operation was cancelled.',
                icon: 'info',
            });
        }
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
                                        onClick={handlerEditUser}
                                        type={"button"}>
                                        Edit
                                    </button>
                                    <button
                                        className={'px-4 py-1 rounded-xl bg-white'}
                                        type={"button"}
                                        onClick={() => deleteCategory(c.email)}
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
