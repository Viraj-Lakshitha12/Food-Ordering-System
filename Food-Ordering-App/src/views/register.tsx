const RegisterForm = () => {
    return (
        <div className="flex flex-col justify-center items-center  bg-center h-screen w-screen">
            <div className="p-8 rounded-md text-white w-96">
                <h1 className="text-3xl font-semibold mb-6 text-red-600">Register</h1>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm  text-gray-500 font-bold">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 p-3 w-full rounded-md bg-gray-300 text-black font-semibold"
                            placeholder="example@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm  text-gray-500 font-bold">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 p-3 w-full rounded-md bg-gray-300 text-black font-semibold"
                            placeholder="********"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
