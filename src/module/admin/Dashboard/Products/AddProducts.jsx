import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react'
import { useFormik } from 'formik';
import { object, string, number, mixed } from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiURL = import.meta.env.VITE_API_BACKEND;

export function AddProducts({ setShowModel = undefined }) {

    const [errorMessage, setErrorMessage] = useState('');

    // for admin add user
    const addSuccess = () => {
        return toast.success("Product Added Successfully")
    }

    let addProductSchema = object().shape({
        name: string().min(2, "Too Short").max(60, "Too Long").required(),
        price: number().required(),
        description: string().min(6, "At leat 6 characters required").required("Description is required"),
        category: string().required(),
        stock: number().required(),
        brand: string().required(),
        photos: mixed()
        .test('required', 'Photos are required', (value) => value && value.length > 0),
    })

    const formik = useFormik({
        validationSchema: addProductSchema,
        initialValues: {
            name: '',
            price: '',
            description: '',
            category: '',
            stock: '',
            brand: '',
            photos: '',
        },
        onSubmit: (data) => {

            const formData = new FormData();

            for (let i = 0; i < data.photos.length; i++) {
                formData.append('photos', data.photos[i]);
            }

            formData.append('name', data.name);
            formData.append('price', data.price);
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('stock', data.stock);
            formData.append('brand', data.brand);

            console.log(data);
            addProductApiCall(formData);
        }
    })

    const { errors, getFieldProps } = formik;

    useEffect(() => {
        console.log(errors)
    }, [errors])

    const addProductApiCall = (data) => {
        let token = localStorage.getItem('token');
        const headers = {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
        console.log(apiURL);
        axios.post(`${apiURL}/admin/product/add`, data, { headers }).then(res => {
            console.log(res.data);
            if (setShowModel) {
                setShowModel(false)
                addSuccess();
            }
        }).catch(err => {
            console.log(err);
            setErrorMessage(err.response.data);
        })
    }

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <div className="mb-2 flex justify-center">

                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Add Product
                    </h2>


                    {errorMessage && (
                        <p className="mt-2 text-center text-base text-red-600">
                            {errorMessage} {' '}
                        </p>
                    )}
                    <form noValidate onSubmit={formik.handleSubmit} encType="multipart/form-data" className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="name" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Product Name{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Product Name"
                                        id="name"
                                        {...getFieldProps('name')}
                                    ></input>
                                </div>
                                <div>
                                    {
                                        errors.name &&
                                        <label className="text-sm font-medium text-red-900">{errors.name}</label>
                                    }
                                </div>
                            </div>
                            <div>
                                <label htmlFor="price" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Price{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="number"
                                        placeholder="Price"
                                        id="price"
                                        {...getFieldProps('price')}
                                    // onChange={()=>setErrorMessage('')}
                                    ></input>
                                </div>
                                <div>
                                    {
                                        errors.price &&
                                        <label className="text-sm font-medium text-red-900">{errors.price}</label>
                                    }
                                </div>
                            </div>
                            <div>
                                <label htmlFor="price" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Stock{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="number"
                                        placeholder="stock"
                                        id="stock"
                                        {...getFieldProps('stock')}
                                    // onChange={()=>setErrorMessage('')}
                                    ></input>
                                </div>
                                <div>
                                    {
                                        errors.stock &&
                                        <label className="text-sm font-medium text-red-900">{errors.stock}</label>
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="description" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Description{' '}
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Description"
                                        id="description"
                                        {...getFieldProps('description')}
                                    ></input>
                                </div>
                                <div>
                                    {
                                        errors.description &&
                                        <label className="text-sm font-medium text-red-900">{errors.description}</label>
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="brand" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Brand{' '}
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Brand"
                                        id="brand"
                                        {...getFieldProps('brand')}
                                    ></input>
                                </div>
                                <div>
                                    {
                                        errors.brand &&
                                        <label className="text-sm font-medium text-red-900">{errors.brand}</label>
                                    }
                                </div>
                            </div>
                            <div>
                                <label htmlFor="role" className="text-base font-medium text-gray-900">
                                    Category
                                </label>
                                <div className="mt-2">
                                    <select
                                        id="category"
                                        name="category"

                                        {...getFieldProps('category')}
                                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                                    >


                                        <option value=""></option>
                                        <option value="longsleeves">Longsleeves</option>
                                        <option value="sweatshirt">Sweatshirt</option>
                                        <option value="hoodies">Hoodies</option>
                                        <option value="shortsleeves">Shortsleeves</option>
                                    </select>
                                </div>
                                <div>
                                    {errors.category && (
                                        <label className="text-sm font-medium text-red-900">{errors.category}</label>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="brand" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Photo{' '}
                                    <div className='mt-2'>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="file"
                                            placeholder="Photos"
                                            id="photos"
                                            multiple
                                            onChange={(e) => {
                                                const files = Array.from(e.currentTarget.files); // Convert the FileList to an array
                                                formik.setFieldValue('photos', files);
                                            }}
                                        ></input>
                                    </div>
                                </label>
                                {errors.photos && (
                                    <label className="text-sm font-medium text-red-900">{errors.photos}</label>
                                )}
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                >
                                    Add Product <ArrowRight className="ml-2" size={16} />
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    )
}