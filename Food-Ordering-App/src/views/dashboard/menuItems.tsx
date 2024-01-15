import { Dashboard } from "../../components/dashboard.tsx";
import Cookies from "js-cookie";
import { useState } from "react";

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

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Here you can handle the form submission logic
        // For example, you can send a request to your server to create a new menu item

        const newItem = {
            image: selectedImage ? URL.createObjectURL(selectedImage) : '', // Use URL.createObjectURL to show the image preview
            itemName,
            description,
            price
        };

        // TODO: Send a request to your server to create a new menu item with the provided data
        console.log("New Menu Item:", newItem);

        // Optionally, you can reset the form fields
        setSelectedImage(null);
        setItemName('');
        setDescription('');
        setPrice('');
    };

    return (
        <section>
            <Dashboard />
            <form className={'max-w-md mx-auto my-4'} onSubmit={handleSubmit}>
                <div className={'flex gap-2'}>
                    <div className={''}>
                        {/* Image chooser */}
                        <label>
                            <input type="file" onChange={handleImageChange} accept="image/*" />
                            <div className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                                {selectedImage ? (
                                    <img
                                        className="object-cover w-full h-full"
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Selected"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        No Image
                                    </div>
                                )}
                            </div>
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
