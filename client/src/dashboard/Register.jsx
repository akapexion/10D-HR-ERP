import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

const Register = () => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmission = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/register", {
                full_name : fullname,
                email : email,
                password : password
            });
            console.log(response);

            setFullname("");
            setEmail("");
            setPassword("");
        }
        catch(err){
            console.log(err);
        }
    }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create an Account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Sign up to get started with your account
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmission}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-gray-200"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-gray-200"
                 value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-gray-200"
                 value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-3.5 font-semibold text-white transition duration-200 hover:bg-gray-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            CREATE ACCOUNT
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-black hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
