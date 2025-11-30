"use client";
import { useState } from "react";
import LoginForm from "@/components/forms/LoginForm";
import { authService } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { loginSuccess } from "@/store/authSlice";

export default function LoginContainer() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState("");
  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      const userData = await authService.login(data);
      dispatch(
        loginSuccess({
          token: userData.access,
          user: data.username,
        })
      );
      router.push("/home");
    } catch (err) {
      console.log(err);
      setError("Usuario o contraseña incorrectos");
    }
  };
  return <LoginForm onSubmit={handleLogin} error={error} />;
}
