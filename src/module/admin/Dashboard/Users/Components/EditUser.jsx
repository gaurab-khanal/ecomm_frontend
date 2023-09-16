import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react'
import { useFormik } from 'formik';
import { object, string, ref } from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const apiURL = import.meta.env.VITE_API_BACKEND;

export function EditUser({ user, setShowModel, userId, setTrackUpdate }) {


  const [errorMessage, setErrorMessage] = useState('');

  const editSuccess = () => {
    return toast.success("User Updated Successfully")
  }

  const adminEditOneUser = (id, data) => {
    let token = localStorage.getItem('token');
    const headers = {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    axios.put(`${apiURL}/admin/user/${id}`, data, { headers }).then(res => {
      setShowModel(false);
      editSuccess();
      setTrackUpdate(data);
    })
  }

  let signUpSchema = object().shape({
    name: string().min(2, "Too Short").max(60, "Too Long").required(),
    email: string().email("Invalid Email").required("Required"),
    role: string()
  })
  const formik = useFormik({
    validationSchema: signUpSchema,
    initialValues: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
    onSubmit: (data) => {
      console.log(data);
      adminEditOneUser(userId, data)
      console.log(user._id);
      setShowModel(false);

    }
  })

  const { errors, getFieldProps } = formik;

  useEffect(() => {
    console.log(errors)
  }, [errors])


  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Update User
          </h2>

          {errorMessage && (
            <p className="mt-2 text-center text-base text-red-600">
              {errorMessage} {' '}
            </p>
          )}
          <form noValidate onSubmit={formik.handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900">
                  {' '}
                  Full Name{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
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
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    {...getFieldProps('email')}
                  // onChange={()=>setErrorMessage('')}
                  ></input>
                </div>
                <div>
                  {
                    errors.email &&
                    <label className="text-sm font-medium text-red-900">{errors.email}</label>
                  }
                </div>
              </div>
              <div>
                <label htmlFor="role" className="text-base font-medium text-gray-900">
                  Role
                </label>
                <div className="mt-2">
                  <select
                    id="role"
                    name="role"
                    {...getFieldProps('role')}
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
                <div>
                  {errors.role && (
                    <label className="text-sm font-medium text-red-900">{errors.role}</label>
                  )}
                </div>
              </div>


              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Update User <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>

        </div>
      </div>
    </section>
  )
}