"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (localStorage.getItem("userId")) {
      router.push("/device-management");
    }
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.status !== 200) {
        console.log("error data: ", data);

        setError(data.message);
        return;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("userId", data.userId);
      }
    } catch (error: any) {
      console.log("error data: ", error);
      setError(error);
    }

    router.push("/device-management");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="m-auto w-[400px] py-[10%]">
        <h1 className="text-center font-bold text-2xl">Sign in</h1>
        <p className="text-center text-sm">
          Enter your email and password to continue
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 mt-6">
            <input
              className="border-[1px] p-2 rounded-lg"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              className="border-[1px] p-2 rounded-lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="p-2 w-full bg-black text-white rounded-lg"
            >
              Sign in
            </button>
            <div className="flex items-center w-full my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 font-semibold">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <Link
              href="register"
              className="p-2 w-full bg-gray-300 text-black rounded-lg text-center"
            >
              Create an account
            </Link>
          </div>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
}
