"use client";
import { IngredientService } from "@/services/IngredientService";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setIngredients } from "@/store/ingredientSlice";
import IngredientTable from "@/components/ui/IngredientTable";
import { CreateIngredient, Ingredient } from "@/types/ingredient";
import Modal from "@/components/ui/Modal";
import { GenericButton } from "@/components/ui/genericButton";
import IngredientForm from "@/components/forms/IngredientForm";
export default function IngredientContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [createError, setCreateError] = useState("");
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector((state) => state.ingredients.ingredients);

  const fetchIngredients = async () => {
    setIsLoading(true);
    setError("");
    try {
      const ingredients = await IngredientService.getAll();
      dispatch(setIngredients(ingredients));
    } catch (err) {
      console.log(err);
      setError("No se pudieron cargar los ingredientes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, [dispatch]);

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
      {error && <p className="text-red-500 mb-2">{error}</p>}
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
    </>
  );
}
