import React, { useState } from "react";

import "./Login.css";
import Header from "../Header/Header";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let login_url = window.location.origin + "/djangoapp/login";

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(login_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    });

    const json = await res.json();
    if (json.status != null && json.status === "Authenticated") {
      sessionStorage.setItem("username", json.userName);
    } else {
      alert("The user could not be authenticated.");
    }
    window.location.href = window.location.origin;
  };

  return (
    <>
      <Header />
      <div className="flex" style={{ height: "calc(100vh - 97px)" }}>
        {/* Imagen del concesionario (70% del ancho) */}
        <div className="hidden lg:block lg:w-[70%] relative">
          <img
            src="/static/contactus.jpg"
            alt="Luxury cars"
            className="object-cover w-full h-full brightness-[30%]"
          />
        </div>

        {/* Formulario de inicio de sesión (30% del ancho) */}
        <div className="w-full lg:w-[30%] flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold text-black">Log In</h2>
              <p className="mt-2 text-sm text-gray-600">
                Log In into your Dealership Account
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={login}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="username"
                    required
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div></div>

                <div className="text-sm">
                  <a
                    href="/register"
                    className="font-medium text-gray-600 hover:text-black"
                  >
                    Register
                  </a>
                </div>
              </div>

              <div>
                <button
                  value="login"
                  type="submit"
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black border border-transparent rounded-md group hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
