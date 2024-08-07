import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';


interface UserData {
    email: string;
    password: string;
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleFormSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();

        const userData: any | UserData = {
            email: email,
            password: password,
        };
        try {
            const response = await axios.post('http://localhost:8080/api/user/auth', userData);

            // console.log("token" +  response.data.data.accessToken)

            Cookies.set('token', response.data.data.accessToken);
            Cookies.set('user', response.data.data.user.email);

            const user = Cookies.get('user');
            if (user) {
                try {
                    const email = user;
                    const responseNew = await axios.get(`http://localhost:8080/api/user/getUserDetailsByEmail/${email}`);
                    const userDetailData = responseNew.data.data;

                    console.log('admin', userDetailData.admin);
                    Cookies.set('admin', userDetailData.admin);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }

            navigate('/');
            window.location.reload();

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully Login user!",
                showConfirmButton: false,
                timer: 2500
            });

        } catch (error) {
            console.error('Error:', error);
            navigate('/login');
            // Handle error, show alert, etc.
            Swal.fire({
                position: "center",
                icon: "info",
                title: "Error adding user. Please try again !",
                showConfirmButton: false,
                timer: 2500
            });
        }
    };


    return (
        <div className="flex flex-col justify-center items-center  bg-center mt-6 my-16">
            <div className="p-16 rounded-3xl text-white border w-[35vw] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                <h1 className="text-3xl font-semibold mb-6 text-red-600 text-center">Login</h1>
                <form className="space-y-6" onSubmit={handleFormSubmit} method={'POST'}
                      action={'http://localhost:8080/auth'}>
                    <div>
                        <label htmlFor="email" className="block text-sm text-gray-500 font-bold">
                            E-Mail Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 p-3 w-full rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800"
                            placeholder="example@example.com"
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm text-gray-500 font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 p-3 w-full rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800"
                            placeholder="********"
                            value={password}
                            onChange={(ev) => setPassword(ev.target.value)}
                        />
                    </div>

                    <button
                        className="relative flex w-full bg-red-600 p-3 rounded-md transition duration-300
                         items-center justify-center overflow-hidden
                         font-medium text-white shadow-2xl  before:absolute before:inset-0 before:border-0
                          before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-red-600 hover:shadow-
                          blue-600 hover:before:border-[25px]" type="submit">
                        <span className="relative z-10">Login</span>
                    </button>
                </form>

                <div className={'text-black text-center p-2 font-semibold mt-2'}>
                    or login with provider
                </div>


                <button
                    className={'flex gap-2 items-center justify-center text-gray-900 my-4 w-full py-1.5 text-center border-2 border-black rounded-md'}>
                    <img src={'src/assets/images/google-icon.png'} alt={'google'} width={'35'}/>Login
                    with google
                </button>
                <div className={'text-center mt-7 text-black font-semibold border-t pt-3'}>
                    Do not have an account ? <Link to={'/register'}><span
                    className={'text-blue-600 underline'}>Sign in now &raquo;</span></Link>
                </div>
            </div>
        </div>
    )
}
