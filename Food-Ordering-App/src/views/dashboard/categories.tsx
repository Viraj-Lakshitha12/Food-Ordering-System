import {Dashboard} from "../../components/dashboard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

const getAllCategories = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/dashboard/getAllCategories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error; // Re-throw the error to handle it in the component
    }
}

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
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories when the component mounts
        getCategoryData();
    }, []);

    const getCategoryData = async () => {
        try {
            const categoriesData = await getAllCategories();

            setCategories(categoriesData);
            console.log(categories);
        } catch (error) {
            // Handle error, show message to user or log to console
        }
    }

    const handleCategoryName = async (event: any) => {
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
                getCategoryData(); // Refresh categories after saving
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
        <section>
            <Dashboard/>
            <form className="flex flex-col max-w-md mx-auto my-10" onSubmit={handleCategoryName}>
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
                <div>

                </div>
            </form>
        </section>
    );
}
