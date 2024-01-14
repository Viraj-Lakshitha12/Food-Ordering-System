import {Dashboard} from "../../components/dashboard.tsx";

export function Categories() {
    return (
        <section>
            <Dashboard/>
            <form className="flex flex-col max-w-md mx-auto my-10">
                <div className={'my-2'}>
                    <label className="font-semibold ">New category name</label>
                </div>
                <div className="flex items-center gap-4">
                    <input className="text-center border border-blue-800 w-full rounded-md" type="text"/>
                    <button className="bg-red-600 text-white px-4 py-1 rounded-md">Submit</button>
                </div>

            </form>


        </section>
    )
}
