import {Dashboard} from "../../components/dashboard.tsx";
import {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";


export function Categories() {
    const [categoryName, setCategoryName] = useState('');

    const handleCategoryName = async (ev: any) => {
        ev.preventDefault();

        const response = await axios.get(`http://localhost:8080/api/profile/saveCategory`).then(r => {
            console.log(r);
            console.log("category response : " + response);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully Save Category!',
                showConfirmButton: false,
                timer: 2000,
            });
        }).catch(error => {
            console.log(error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error Save Category!',
                showConfirmButton: false,
                timer: 2500,
            });
        });

    }


    return (
        <section>
            <Dashboard/>
            <form className="flex flex-col max-w-md mx-auto my-10" onSubmit={handleCategoryName}>
                <div className={'my-2'}>
                    <label className="font-semibold ">New category name</label>
                </div>
                <div className="flex items-center gap-4">
                    <input className="text-center border border-blue-800 w-full rounded-md" type="text"
                           value={categoryName}
                           onChange={event => setCategoryName(event.target.value)}
                    />
                    <button className="bg-red-600 text-white px-4 py-1 rounded-md">Submit</button>
                </div>

            </form>


        </section>
    )
}
