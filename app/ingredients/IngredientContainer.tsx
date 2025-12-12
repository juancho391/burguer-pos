"use client";
import { IngredientService } from "@/services/IngredientService";
import { useState } from "react";
import IngredientTable from "@/components/ui/IngredientTable";
import { CreateIngredient, Ingredient } from "@/types/ingredient";
import Modal from "@/components/ui/Modal";
import { GenericButton } from "@/components/ui/genericButton";
import IngredientForm from "@/components/forms/IngredientForm";
import useIngredients from "@/hooks/useIngredients";
import { useAppSelector } from "@/hooks/reduxHooks";
export default function IngredientContainer({
  isLoading,
}: {
  isLoading: boolean;
}) {
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [createError, setCreateError] = useState("");
  const { fetchIngredients } = useIngredients();

  const handleUpdateStock = async (
    ingredient: Ingredient,
    increment: number
  ) => {
    setError("");
    try {
      const updatedIngredient = {
        ...ingredient,
        stock: ingredient.stock + increment,
      };

      if (updatedIngredient.stock < 0) {
        setError("El stock no puede ser menor que 0");
        return;
      }

      await IngredientService.updateOne(updatedIngredient);
      await fetchIngredients();
    } catch (err) {
      console.log(err);
      setError("No se pudo actualizar el stock");
    }
  };

  const increaseStock = (ingredient: Ingredient) =>
    handleUpdateStock(ingredient, 1);
  const decreaseStock = (ingredient: Ingredient) =>
    handleUpdateStock(ingredient, -1);

  const deleteIngredient = async (ingredient: Ingredient) => {
    setError("");
    try {
      await IngredientService.deleteOne(ingredient.id);
      await fetchIngredients();
    } catch (err) {
      console.log(err);
      setError("No se pudo eliminar el ingrediente");
    }
  };

  const createNewIngredient = async (ingredient: CreateIngredient) => {
    const defaultIngredient: CreateIngredient = {
      name: "",
      stock: 0,
      reposition_point: 10,
    };
    const newIngredient: CreateIngredient = {
      ...defaultIngredient,
      ...ingredient,
    };
    setCreateError("");
    try {
      await IngredientService.createOne(newIngredient);
      setOpen(false);
      await fetchIngredients();
    } catch (error) {
      setCreateError("Ocurrio un error al crear ingrediente");
      console.log(error);
    }
  };

  return (
    <>
      <IngredientTable
        ingredients={ingredients}
        isLoading={isLoading}
        onIncrease={increaseStock}
        onDecrease={decreaseStock}
        onDelete={deleteIngredient}
      />
      <GenericButton className="self-start" onClick={() => setOpen(true)}>
        Agregar Ingrediente
      </GenericButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <IngredientForm
          onSubmit={createNewIngredient}
          error={createError}
          onClose={() => setOpen(false)}
        />
      </Modal>
      {error && <p className="text-red-500 mb-2">{error}</p>}
    </>
  );
}
