"use client";
import React, { useState } from "react";
import { Card } from "../ui/Card";
import { GenericInput } from "../ui/GenericInput";
import { GenericButton } from "../ui/genericButton";
export default function IngredientForm({
  onSubmit,
  error,
  onClose,
}: {
  onSubmit: (data: {
    name: string;
    stock: number;
    reposition_point: number;
  }) => void;
  error?: string;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    stock: 0,
    reposition_point: 10,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateIngredient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="border p-10 text-center w-full flex flex-col gap-3">
      <h2 className="font-bold text-2xl">Crear ingrediente</h2>
      <p></p>
      <form onSubmit={handleCreateIngredient} className="flex flex-col gap-2">
        <label htmlFor="name" className="self-start">
          Nombre
        </label>
        <GenericInput
          name="name"
          type="text"
          placeholder="Nombre"
          onChange={handleChange}
        />
        <label htmlFor="stock" className="self-start">
          Stock
        </label>
        <GenericInput
          name="stock"
          type="number"
          placeholder="Stock"
          onChange={handleChange}
        />
        <label htmlFor="reposition_point" className="self-start">
          Punto de reposición
        </label>
        <GenericInput
          type="number"
          name="reposition_point"
          placeholder="Punto de reposición"
          onChange={handleChange}
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex gap-2 w-full">
          <GenericButton type="submit">Crear</GenericButton>
          <GenericButton onClick={onClose} className="bg-red-500">
            Cancelar
          </GenericButton>
        </div>
      </form>
    </Card>
  );
}
