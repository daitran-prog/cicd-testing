"use client";
import { signUp } from "@/src/firebase/auth";
import { useState } from "react";


export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await signUp(email, password);
      console.log(user)
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
  <form
  onSubmit={handleSubmit}
  className="max-w-sm mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 space-y-4"
>
  <h2 className="text-2xl font-bold text-center text-gray-800">
    Sign Up
  </h2>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Email
    </label>
    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:border-blue-500 transition"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Password
    </label>
    <input
      type="password"
      placeholder="Enter your password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 focus:border-blue-500 transition"
    />
  </div>

  <button
    type="submit"
    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 
               text-white font-semibold rounded-lg shadow 
               transition duration-200"
  >
    Sign Up
  </button>

  {error && (
    <p className="text-red-500 text-sm text-center">{error}</p>
  )}
</form>

  );
}
