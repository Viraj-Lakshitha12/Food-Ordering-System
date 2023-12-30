export default function Register() {
    return (
        <section>
            <h1 className={'font-semibold text-red-600 text-4xl text-center'}> Register</h1>
            <form className={'rounded-xl'}>
            <input className={'border-gray-300 bg-gray-200 p-3 rounded-xl min-w-full m-4 '} type={"email"} placeholder={'Email'}/>
            <input className={'border-gray-300 bg-gray-200 p-3 rounded-xl m-4 '} type={"password"} placeholder={'Password'}/>
            </form>
        </section>
    )
}