import {Dashboard} from "../../components/dashboard.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";


interface Category {
    _id: string;
    type: string;
}

export function Categories() {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [editCategory, setEditCategory] = useState<Category | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminStatus = () => {
            // @ts-ignore
            const adminStatus = Cookies.get('admin') === 'true' || Cookies.get('admin') === true;
            console.log("new admin :" + adminStatus)
            if (adminStatus) {
                getCategoryData();
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Access denied. You are not an admin !',
                    showConfirmButton: false,
                    timer: 2500,
                });
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        };

        checkAdminStatus(); // Call the function

    }, []);


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

    function deleteCategory(_id: any) {
        Swal.fire({
            title: "Are you sure you want to delete?",
            text: "You won't be able to revert this!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/api/dashboard/deleteCategory/${_id}`).then(r => {
                    console.log(r);
                    Swal.fire({
                        title: "DELETE!",
                        text: "The category has been successfully deleted",
                        icon: "success"
                    });
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }).catch(error => {
                    console.log(error);
                    Swal.fire({
                        title: "DELETE!",
                        text: "something went wrong",
                        icon: "warning"
                    });
                })
            }
        });
    }

    return (
        <section className="max-w-md mx-auto my-10">
            <Dashboard/>
            <form className="flex flex-col" onSubmit={handleCategoryName}>
                <div className="my-2">
                    <label className="font-bold">{editCategory ? 'Edit category name' : 'New category name'}</label>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        className="text-center py-1 border border-blue-800 w-full rounded-md"
                        type="text"
                        value={categoryName}
                        onChange={(event) => setCategoryName(event.target.value)}
                    />
                    <button className="bg-red-600 text-white px-4 py-1.5 rounded-md font-semibold" type="submit">
                        {editCategory ? 'Update' : 'Create'}
                    </button>
                    <button className="bg-white text-black px-4 py-1.5 shadow border-2 rounded-md font-semibold"
                            onClick={() => {
                                setEditCategory(null)
                                setCategoryName('');
                            }}
                            type="button">
                        Cancel
                    </button>
                </div>
                <div className="mt-5">
                    <span className="">Edit category: </span>
                    {categories?.length > 0 &&
                        categories.map((c) => (
                            <div
                                key={c._id}

                                className="flex my-1 bg-gray-200 rounded-lg p-2"
                            >
                                <div className="grow  font-semibold "
                                >{c.type}</div>
                                <div className={'flex gap-1 '}>
                                    <button
                                        className={'px-4 py-1 rounded-xl bg-white'}
                                        type={"button"}
                                        onClick={() => {
                                            setEditCategory(c);
                                            setCategoryName(c.type);
                                        }}>
                                        Edit
                                    </button>
                                    <button
                                        className={'px-4 py-1 rounded-xl bg-white'}
                                        type={"button"}
                                        onClick={() => deleteCategory(c._id)}
                                    >Delete
                                    </button>
                                </div>
                            </div>

                        ))}

                </div>

            </form>
        </section>
    );
}
