import {Dashboard} from "../../../components/dashboard.tsx";
import Cookies from "js-cookie";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
import Right from "../../../assets/icons/right.tsx";

interface MenuItem {
    id?: '',
    itemName: string;
    description: string;
    price: string;
    image: File | null | string;
}

export function UpdateMenuItems() {
    const [menuItem, setMenuItem] = useState<MenuItem>({
        itemName: "",
        description: "",
        price: "",
        image: null,
    });
    const [id, setId] = useState('');

    // @ts-ignore
    const isAdmin = Cookies.get("admin") === "true" || Cookies.get("admin") === true;

    if (!isAdmin) {
        alert("Access denied. You are not an admin.");
        return null;
    }

    useEffect(() => {
        let itemName = Cookies.get('itemName');
        console.log(itemName);
        axios.get(`http://localhost:8080/api/dashboard/getAllMenuItems/${itemName}`).then(r => {
            setMenuItem(r.data.data);
            setId(r.data.data._id);
        })

    }, []);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        // Form validation
        if (!menuItem.itemName || !menuItem.description || !menuItem.price || !menuItem.image) {
            alert("Please fill in all fields and choose an image.");
            return;
        }

        try {
            // Wait for the image to load
            await new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(null);
                img.src = menuItem.image as string;
            });

            // If the image is successfully loaded, proceed with the form submission
            await axios.put("http://localhost:8080/api/dashboard/updateMenuItem", {
                id: id,
                itemName: menuItem.itemName,
                description: menuItem.description,
                price: menuItem.price,
                image: menuItem.image,
            });

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Successfully Update Menu-Items!",
                showConfirmButton: false,
                timer: 2500,
            });

            // Reset form after successful submission
            setMenuItem({
                itemName: "",
                description: "",
                price: "",
                image: null,
            });
        } catch (error) {
            console.error(error);
            // Handle error display or logging as needed
            alert("Error saving menu items. Please try again.");
        }
    };


    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                var base64String = new FileReader();
                base64String.readAsDataURL(file);
                base64String.onload = () => {
                    console.log(base64String.result)
                    // @ts-ignore
                    setMenuItem({...menuItem, image: base64String.result});
                }
            } catch (error) {
                console.error("Error converting file to base64: ", error);
            }
        }
    };


    return (
        <section>
            <Dashboard/>
            <form className="max-w-md mx-auto my-4" onSubmit={handleSubmit}>
                <div className="border border-blue-700 rounded-md p-2 font-semibold mb-10">
                    <Link to="/showMenuItem" className="flex gap-4 justify-center">
                        Show Menu Items
                        <Right/>
                    </Link>
                </div>

                <div className="flex gap-4">
                    <div className={''}>
                        {/* Image chooser */}
                        <label className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                            <input
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="absolute overflow-hidden inset-0 opacity-0 cursor-pointer w-[100px] h-[100px]"
                            />
                            {menuItem.image ? (
                                <img
                                    className="object-cover w-[150px] h-[150px]"
                                    //@ts-ignore
                                    src={menuItem.image}
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

                    <div className="flex flex-col flex-grow">
                        <label className="font-semibold">Item Name</label>
                        <input
                            type="text"
                            className="border border-blue-700 rounded-md p-1 bg-gray-100"
                            value={menuItem.itemName}
                            onChange={(e) => setMenuItem({...menuItem, itemName: e.target.value})}
                        />

                        <label className="font-semibold">Description</label>
                        <input
                            type="text"
                            className="border border-blue-700 rounded-md p-1 bg-gray-100"
                            value={menuItem.description}
                            onChange={(e) => setMenuItem({...menuItem, description: e.target.value})}
                        />

                        <label className="font-semibold">Price</label>
                        <input
                            type="text"
                            className="border border-blue-700 rounded-md p-1 bg-gray-100"
                            value={menuItem.price}
                            onChange={(e) => setMenuItem({...menuItem, price: e.target.value})}
                        />
                        <button
                            className="mt-5 bg-red-600 px-5 py-2 rounded-xl font-semibold text-white text-xl"
                            type="submit"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );

}
