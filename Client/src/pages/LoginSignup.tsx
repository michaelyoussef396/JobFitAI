import React, { useState } from "react";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup

  return (
    <div className="flex items-center justify-center min-h-screen bg-s1 text-p5">
      <div className="login-signup-container bg-s2 p-10 rounded-7xl shadow-500 w-full max-w-md">
        {isLogin ? (
          <div>
            <h2 className="h3 mb-8 text-center text-p3">Login</h2>
            <form className="space-y-6">
              <div>
                <label className="block mb-2 text-base-bold">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-14 focus:outline-none focus:ring-2 focus:ring-p1"
                />
              </div>
              <div>
                <label className="block mb-2 text-base-bold">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-14 focus:outline-none focus:ring-2 focus:ring-p1"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 mt-4 bg-p3 text-s1 rounded-14 transition-all duration-500 hover:bg-p2 hover:shadow-200"
              >
                Login
              </button>
            </form>
            <p className="mt-6 text-center">
              Don't have an account?{" "}
              <span
                className="cursor-pointer text-p1 hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </span>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="h3 mb-8 text-center text-p3">Sign Up</h2>
            <form className="space-y-6">
              <div>
                <label className="block mb-2 text-base-bold">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-14 focus:outline-none focus:ring-2 focus:ring-p1"
                />
              </div>
              <div>
                <label className="block mb-2 text-base-bold">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-14 focus:outline-none focus:ring-2 focus:ring-p1"
                />
              </div>
              <div>
                <label className="block mb-2 text-base-bold">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full px-4 py-2 bg-s1 text-p5 border border-s4 rounded-14 focus:outline-none focus:ring-2 focus:ring-p1"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 mt-4 bg-p3 text-s1 rounded-14 transition-all duration-500 hover:bg-p2 hover:shadow-200"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-6 text-center">
              Already have an account?{" "}
              <span
                className="cursor-pointer text-p1 hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
