"use client";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {toast} from "sonner"; // for toast

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    // Simple mock registration (no real API)
    if (username && password) {
      // Here you could POST to /api/register if needed
      toast.success("Registration successful!", {position: "bottom-right"});
      setTimeout(() => {
        router.push("/login");
      }, 1500); // 1.5 seconds delay
    } else {
      toast.error("Please fill all fields", {position: "bottom-right"});
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Register</h1>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-2"
      />
      <Button onClick={handleRegister} className="mt-4">
        Register
      </Button>

      <p className="mt-2 text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 underline">
          Login
        </Link>
      </p>
    </div>
  );
}
