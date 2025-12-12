import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "./reduxHooks";
import { setIngredients } from "@/store/ingredientSlice";
import { IngredientService } from "@/services/IngredientService";

export default function useIngredients() {
  const [ingredientError, setIngredientError] = useState("");
  const dispatch = useAppDispatch();

  const fetchIngredients = useCallback(async () => {
    setIngredientError("");
    try {
      const products = await IngredientService.getAll();
      dispatch(setIngredients(products));
    } catch (err) {
      console.log(err);
      setIngredientError("No se pudieron cargar los productos");
    }
  }, [dispatch]);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  return {
    ingredientError,
    fetchIngredients,
  };
}
