import {Dashboard} from "../../components/dashboard.tsx";
import Cookies from "js-cookie";
import {useState} from "react";

export function MenuItems() {
    const [image, setImage] = useState('');
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    // @ts-ignore
    const isAdmin = Cookies.get('admin') === 'true' || Cookies.get('admin') === true;

    console.log("isAdmin Check: ", isAdmin);

    if (!isAdmin) {
        console.log("Alert Triggered");
        alert("Access denied. You are not an admin.");
        return null;
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Here you can handle the form submission logic
        // For example, you can send a request to your server to create a new menu item

        const newItem = {
            image,
            itemName,
            description,
            price
        };

        // TODO: Send a request to your server to create a new menu item with the provided data
        console.log("New Menu Item:", newItem);

        // Optionally, you can reset the form fields
        setImage('');
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
                        image

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
