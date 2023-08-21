"use client";
import React, { useState } from "react";

import axios from "axios";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.API_URL}/auth/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        window.location.href = "/";

        // store the token in local storage
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("An error occurred.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container flex">
        <div className="imageSide flex-1 flex justify-center items-center bg-gray-100">
          <Image
            src="/img/logo.jpg"
            alt="Login Image"
            className="max-w-full max-h-100%"
            property="login image"
            width={500}
            height={500}
          />
        </div>
        <div className="formSide flex-1 flex flex-col justify-center items-center p-6 bg-white shadow-md">
          <h2 className="mb-4">Login</h2>
          {/* Your login form components will go here */}
          <form className="w-full max-w-sm">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full rounded border border-gray-300"
                placeholder="Your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full rounded border border-gray-300"
                placeholder="Your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
