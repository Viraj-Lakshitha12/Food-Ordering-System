import {Dashboard} from "../../components/dashboard.tsx";
import Cookies from "js-cookie";
import {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

export function MenuItems() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    // Check if the user is an admin
    // @ts-ignore
    const isAdmin = Cookies.get('admin') === 'true' || Cookies.get('admin') === true;

    console.log("isAdmin Check: ", isAdmin);

    if (!isAdmin) {
        console.log("Alert Triggered");
        alert("Access denied. You are not an admin.");
        return null;
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedImage(file);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const newItem = {
            image: selectedImage ? URL.createObjectURL(selectedImage) : '',
            itemName,
            description,
            price
        };

        await axios.post(`http://localhost:8080/api/dashboard/saveMenuItems`, newItem).then(r => {
            console.log(r);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Successfully Saved Menu-Items!',
                showConfirmButton: false,
                timer: 2500,
            });
        }).catch(error => {
            console.log(error);
        });

        setSelectedImage(null);
        setItemName('');
        setDescription('');
        setPrice('');
    };

    return (
        <section>
            <Dashboard/>
            <form className={'max-w-md mx-auto my-4'} onSubmit={handleSubmit}>
                <div className={'flex gap-4'}>
                    <div className={''}>
                        {/* Image chooser */}
                        <label className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                            <input
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="absolute overflow-hidden inset-0 opacity-0 cursor-pointer w-[100px] h-[100px]"
                            />
                            {selectedImage ? (
                                <img
                                    className="object-cover max-w-[150px] max-h-[150px]"
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected"
                                />
                            ) : (
                                <div
                                    className="flex items-center justify-center font-bold w-[150px] h-[150px] border-2 text-black">
                                    No Image
                                </div>
                            )}
                        </label>
                    </div>

                    <div className={'flex flex-col flex-grow'}>
                        <label className={'font-semibold'}>Item Name</label>
                        <input
                            type={"text"}
                            className={'border border-blue-700 rounded-md p-1'}
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />

                        <label className={'font-semibold'}>Description</label>
                        <input
                            type={"text"}
                            className={'border border-blue-700 rounded-md p-1'}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <label className={'font-semibold'}>Price</label>
                        <input
                            type={"text"}
                            className={'border border-blue-700 rounded-md p-1'}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <button
                            className={'mt-5 bg-red-600 px-5 py-2 rounded-xl font-semibold text-white text-xl'}
                            type={"submit"}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}
