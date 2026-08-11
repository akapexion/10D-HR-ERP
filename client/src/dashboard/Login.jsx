import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmission = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/login", {
                email,
                password
            });
            console.log(response);

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
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to your account to continue
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmission}>
          
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
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <a
                href="#"
                className="text-sm font-medium text-gray-600 hover:text-black hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-black focus:bg-white focus:ring-2 focus:ring-gray-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 accent-black"
            />

            <label
              htmlFor="remember"
              className="ml-2 text-sm text-gray-600"
            >
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-3.5 font-semibold text-white transition duration-200 hover:bg-gray-800 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          >
            LOGIN
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <a
            href="#"
            className="font-semibold text-black hover:underline"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
