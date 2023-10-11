// ShippingInfo.js

import { useContext, useEffect } from 'react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { OrderItemsContext } from '../../context/OrderItemsContext';
import { OrderFromBackend } from '../../context/OrderFromBackendContext';

const shippingInfoSchema = object().shape({
    address: string().required('Address is required'),
    city: string().required('City is required'),
    phoneNo: string()
        .matches(/^[0-9]+$/, 'Invalid phone number')
        .required('Phone number is required'),
    postalCode: string().required('Postal code is required'),
    state: string().required('State is required'),
    country: string().required('Country is required'),
});

const apiURL = import.meta.env.VITE_API_BACKEND;


const ShippingInfo = () => {

    const { setShippingInfo, orderSuccess } = useContext(OrderItemsContext);

    const { getMyOrders } = useContext(OrderFromBackend)

    const initialValues = JSON.parse(localStorage.getItem('shippingInfo')) || {};

    const formik = useFormik({
        initialValues,
        validationSchema: shippingInfoSchema,
        onSubmit: (data) => {

            setShippingInfo(data);
            localStorage.setItem('shippingInfo', JSON.stringify(data));
            handleOrder();

        },
    });

    const { errors, getFieldProps } = formik;

    useEffect(() => {
        console.log(errors)
    }, [errors])


    const esewaCall = (order) => {
        var path = "https://uat.esewa.com.np/epay/main";
        var params = {
            amt: order.totalAmount,
            psc: 0,
            pdc: 0,
            txAmt: 0,
            tAmt: order.totalAmount,
            pid: order._id,
            scd: "EPAYTEST",
            su: "http://localhost:5173/users/esewa_payment_success",
            fu: "http://localhost:5173/users/esewa_payment_failed"
        }
        
        console.log(params);

        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);

        for (var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form.submit();
    }

    const handleOrder = () => {
        let token = localStorage.getItem('token');
        const headers = {
            "Authorization": `Bearer ${token}`,
            'Content-Type': "application/json"
        }
        const data = JSON.parse(localStorage.getItem('orderInfo'));
        axios.post(`${apiURL}/order/create`, data, { headers })
            .then((res) => {
                esewaCall(res.data.order)
                console.log(res.data);
                localStorage.removeItem("cart");
                orderSuccess()
                getMyOrders();
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <div className="mb-2 flex justify-center">
                    </div>
                    <h1 className="text-center text-3xl font-bold leading-tight text-black">
                        ShippingInfo
                    </h1>
                    <form noValidate onSubmit={formik.handleSubmit} className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Address{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Address"
                                        {...getFieldProps('address')}
                                    ></input>
                                </div>
                                <div>
                                    {
                                        errors.address &&
                                        <label className="text-sm font-medium text-red-900">{errors.address}</label>
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        City{' '}
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="City"
                                        {...getFieldProps('city')}
                                    ></input>
                                </div>
                                <div>
                                    {
                                        errors.city &&
                                        <label className="text-sm font-medium text-red-900">{errors.city}</label>
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Phone No{' '}
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Phone No"
                                        {...getFieldProps('phoneNo')}
                                    ></input>
                                </div>
                                <div>
                                    {
                                        errors.phoneNo &&
                                        <label className="text-sm font-medium text-red-900">{errors.phoneNo}</label>
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Postal Code{' '}
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="{Postal Code}"
                                        {...getFieldProps('postalCode')}
                                    ></input>
                                </div>
                                <div>
                                    {
                                        errors.postalCode &&
                                        <label className="text-sm font-medium text-red-900">{errors.postalCode}</label>
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        State{' '}
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Text"
                                        {...getFieldProps('state')}
                                    ></input>
                                </div>
                                <div>
                                    {
                                        errors.state &&
                                        <label className="text-sm font-medium text-red-900">{errors.state}</label>
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Country{' '}
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Country"
                                        {...getFieldProps('country')}
                                    ></input>
                                </div>
                                <div>
                                    {
                                        errors.country &&
                                        <label className="text-sm font-medium text-red-900">{errors.country}</label>
                                    }
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                >
                                    Checkout and Paywith Esewa
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    )
};

export default ShippingInfo;
