"use client";
import {useAuth} from "@/components/AuthContext";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {toast} from "sonner"; // for toast

export default function LoginPage() {
  const {login} = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({username, password}),
    });
    if (res.ok) {
      const data = await res.json();
      login(data);
      toast.success("Login successful!", {position: "bottom-right"});
      setTimeout(() => {
        router.push("/explore");
      }, 1000); // 1 second delay
    } else {
      toast.error("Invalid credentials", {position: "bottom-right"});
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
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
      <Button onClick={handleLogin} className="mt-4">
        Login
      </Button>

      <p className="mt-2 text-sm">
        Don’t have an account?{" "}
        <Link href="/register" className="text-blue-500 underline">
          Register
        </Link>
      </p>
    </div>
  );
}
