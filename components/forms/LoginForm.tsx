"use client";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import { GenericInput } from "../ui/GenericInput";
import { Card } from "../ui/Card";

export default function LoginForm({
  onSubmit,
  error,
}: {
  onSubmit: (data: { email: string; password: string }) => void;
  error?: string;
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="border p-10 text-center w-1/2">
      <h2 className="text-2xl font-bold">Bienvenido</h2>
      <p>Inicia sesion para continuar</p>
      <form
        onSubmit={handleLogin}
        className="mt-5 flex flex-col gap-2 items-center justify-center"
      >
        <label htmlFor="email" className="self-start">
          Correo Electronico
        </label>
        <GenericInput
          name="email"
          placeholder="Correo Electronico"
          onChange={handleChange}
        />
        <label htmlFor="password" className="self-start">
          Contraseña
        </label>
        <GenericInput
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <Button type="submit" className="border w-1/2 mt-3">
          Iniciar Sesion
        </Button>
      </form>
    </Card>
  );
}
