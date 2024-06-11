"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState<string>();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password != retypePassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const res = await fetch("/api/register", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (res.status !== 200) {
      console.log("error data: ", data);

      setError(data.message);
      return;
    }

    if (res.status === 200) {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="m-auto w-[400px] py-[10%]">
        <h1 className="text-center font-bold text-2xl">Create an account</h1>
        <p className="text-center text-sm">
          Pick your unique username and set a secret password
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
            <input
              className="border-[1px] p-2 rounded-lg"
              type="password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              placeholder="Re-type password"
              required
            />
            <button
              type="submit"
              className="p-2 w-full bg-black text-white rounded-lg"
            >
              Sign up
            </button>
          </div>
        </form>
        {error && <p className="text-[#e73e3e] mt-2">{error}</p>}
      </div>
    </div>
  );
}
