import {Dashboard} from "../../components/dashboard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface Category {
    _id: string;
    type: string;
}

const getAllCategories = async () => {
    try {
        const response = await axios.get<{ data: Category[] }>(
            "http://localhost:8080/api/dashboard/getAllCategories"
        );
        if (response.data) {
            return response.data.data;
        } else {
            console.log("No data received from the server.");
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
};

const saveCategory = async (categoryData: any) => {
    try {
        const response = await axios.post('http://localhost:8080/api/dashboard/saveCategory', categoryData);
        return response.data;
    } catch (error) {
        console.error('Error saving category:', error);
        throw error;
    }
}

export function Categories() {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategoryData();
    }, []);

    const getCategoryData = async () => {
        try {
            const categoriesData = await getAllCategories();
            // @ts-ignore
            setCategories(categoriesData); // Replace the existing state with the new data
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }


    const handleCategoryName = async (event: React.FormEvent) => {
        event.preventDefault();

        if (categoryName.trim() === '') {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Please enter a category!',
                showConfirmButton: false,
                timer: 2500,
            });
        } else {
            try {
                const data = {type: categoryName};
                await saveCategory(data);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully saved category!',
                    showConfirmButton: false,
                    timer: 2000,
                });
                setCategoryName('');
                getCategoryData();
            } catch (error) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error saving category!',
                    showConfirmButton: false,
                    timer: 2500,
                });
            }
        }
    }

    return (
        <section className={'max-w-md mx-auto my-10'}>
            <Dashboard/>
            <form className="flex flex-col " onSubmit={handleCategoryName}>
                <div className="my-2">
                    <label className="font-semibold">New category name</label>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        className="text-center border border-blue-800 w-full rounded-md"
                        type="text"
                        value={categoryName}
                        onChange={(event) => setCategoryName(event.target.value)}
                    />
                    <button className="bg-red-600 text-white px-4 py-1 rounded-md" type="submit">
                        Submit
                    </button>
                </div>
                <div className={'mt-5'}>
                    <span className={''}>edit category : </span>
                    {categories?.length > 0 &&
                        categories.map((c) => (
                            <div className={'my-2 bg-gray-200 rounded-lg p-2 cursor-pointer'}>
                                <span className={'font-semibold'}>{c.type}</span>
                            </div>
                        ))}
                </div>
            </form>
        </section>
    );
}
