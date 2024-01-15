import {Dashboard} from "../../components/dashboard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface Category {
    _id: string;
    type: string;
}

export function Categories() {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [editCategory, setEditCategory] = useState<Category | null>(null);

    useEffect(() => {
        getCategoryData();
    }, []);

    // @ts-ignore
    const isAdmin = Cookies.get('admin') === 'true' || Cookies.get('admin') === true;

    if (!isAdmin) {
        alert("Access denied. You are not an admin.");
        return null;
    }

    const getAllCategories = async () => {
        try {
            const response = await axios.get<{ data: Category[] }>(
                "http://localhost:8080/api/dashboard/getAllCategories"
            );
            return response.data.data || [];
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    };

    const saveCategory = async (categoryData: any) => {
        try {
            const response = editCategory
                ? await axios.put(`http://localhost:8080/api/dashboard/saveCategory/${editCategory._id}`, categoryData)
                : await axios.post('http://localhost:8080/api/dashboard/saveCategory', categoryData);

            return response.data;
        } catch (error) {
            console.error('Error saving category:', error);
            throw error;
        }
    };

    const getCategoryData = async () => {
        try {
            const categoriesData = await getAllCategories();
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

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

                const successTitle = editCategory ? 'Successfully updated category!' : 'Successfully saved category!';


                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: successTitle,
                    showConfirmButton: false,
                    timer: 2000,
                });

                setCategoryName('');
                setEditCategory(null);
                getCategoryData();
            } catch (error) {
                const errorTitle = editCategory ? 'Error updating category!' : 'Error saving category!';
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: errorTitle,
                    showConfirmButton: false,
                    timer: 2500,
                });
            }
        }
    };

    return (
        <section className="max-w-md mx-auto my-10">
            <Dashboard/>
            <form className="flex flex-col" onSubmit={handleCategoryName}>
                <div className="my-2">
                    <label className="font-bold">{editCategory ? 'Edit category name' : 'New category name'}</label>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        className="text-center border border-blue-800 w-full rounded-md"
                        type="text"
                        value={categoryName}
                        onChange={(event) => setCategoryName(event.target.value)}
                    />
                    <button className="bg-red-600 text-white px-4 py-1 rounded-md" type="submit">
                        {editCategory ? 'Update' : 'Create'}
                    </button>
                </div>
                <div className="mt-5">
                    <span className="">Edit category: </span>
                    {categories?.length > 0 &&
                        categories.map((c) => (
                            <div
                                key={c._id}
                                onClick={() => {
                                    setEditCategory(c);
                                    setCategoryName(c.type);
                                }}
                                className="my-1 bg-gray-200 rounded-lg p-2 cursor-pointer"
                            >
                                <span className="font-semibold">{c.type}</span>
                            </div>
                        ))}
                </div>
            </form>
        </section>
    );
}
