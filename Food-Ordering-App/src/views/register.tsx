import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

// const GOOGLE_CLIENT_ID =


interface UserData {
    email: string;
    password: string;
}

const RegisterForm = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = async (ev: React.FormEvent) => {
        ev.preventDefault();

        const userData: UserData = {
            email: email,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:8080/api/user/register', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {'Content-Type': 'application/json'},
            });

            if (!response.ok) {
                // alert('Something went wrong');
                Swal.fire({
                    position: "center",
                    icon: "info",
                    title: "Something went wrong !",
                    showConfirmButton: false,
                    timer: 2500
                });

                return;
            }

            // Parse the JSON response
            const data = await response.json();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully registered!",
                html: "You can now log in with your credentials.",
                showConfirmButton: false,
                timer: 2500
            });
            navigate('/login')
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding user. Please try again.');
        }
    };


    return (
        <div className="flex flex-col justify-center items-center  bg-center mt-6 my-16">
            <div className="p-16 rounded-3xl text-white border w-[35vw] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                <h1 className="text-3xl font-semibold mb-6 text-red-600 text-center">Register</h1>
                <form className="space-y-6" onSubmit={handleFormSubmit}>
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
                        <span className="relative z-10">Register</span>
                    </button>
                </form>

                <div className={'text-black text-center p-2 font-semibold mt-2'}>
                    or login with provider
                </div>

                {/*<div>*/}
                {/*    <GoogleLogin*/}
                {/*        clientId= "789989705264-gma5ksdvd73b67iogng1jkro5qtejr9e.apps.googleusercontent.com"*/}
                {/*        buttonText="Login with Google"*/}
                {/*        onSuccess={responseGoogle}*/}
                {/*        onFailure={responseGoogle}*/}
                {/*        cookiePolicy={'single_host_origin'} // or 'none' or 'https://your.domain.com'*/}
                {/*    />*/}

                {/*</div>*/}
                <button
                    className={'flex gap-2 items-center justify-center text-gray-900 my-4 w-full py-1.5 text-center border-2 border-black rounded-md'}>
                    <img src={'src/assets/images/google-icon.png'} alt={'google'} width={'35'}/>Login
                    with google
                </button>
                <div className={'font-semibold border-t pt-3 text-black text-center mt-7'}>
                    Do have an account? <Link to={'/login'}><span
                    className={'text-blue-600 underline'}>Sign In now &raquo;</span></Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
