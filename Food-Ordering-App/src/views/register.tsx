const RegisterForm = () => {
    return (
        <div className="flex flex-col justify-center items-center  bg-center mt-10 my-16">
            <div className="p-20 rounded-3xl text-white border w-[35vw] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                {/* Your content goes here */}
            {/*ring ring-offset-4 ring-opacity-80 bg-gray-800*/}
            <h1 className="text-3xl font-semibold mb-6 text-red-600 text-center">Register</h1>
            <form className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm  text-gray-500 font-bold">
                        E-Mail Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 p-3 w-full rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800"
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
                        className="mt-1 p-3 w-full rounded-md bg-gray-200 text-black font-semibold hover:border-2 hover:border-blue-800"
                        placeholder="********"/>
                </div>

                <button
                    className="relative flex w-full bg-red-600 p-3 rounded-md transition duration-300
                         items-center justify-center overflow-hidden
                         font-medium text-white shadow-2xl  before:absolute before:inset-0 before:border-0
                          before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-red-600 hover:shadow-
                          blue-600 hover:before:border-[25px]">
                    <span className="relative z-10">Register</span>
                </button>

                {/*<button*/}
                {/*    type="submit"*/}
                {/*    className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition duration-300">*/}
                {/*    Register*/}
                {/*</button>*/}

            </form>
            <div className={'text-black text-center p-2 font-semibold mt-2'}>
                or login with provider
            </div>

            <button
                className={'flex gap-2 items-center justify-center text-gray-900 my-4 w-full py-1.5 text-center border-2 border-black rounded-md'}>
                <img src={'src/assets/images/google-icon.png'} alt={'google'} width={'35'}/>Login
                with google
            </button>
        </div>
</div>
)
    ;
};

export default RegisterForm;
