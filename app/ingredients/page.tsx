import { GenericButton } from "@/components/ui/genericButton";
import IngredientContainer from "./IngredientContainer";

export default function Ingredients() {
  return (
    <main className="w-full flex flex-col items-center p-5">
      <h1 className="font-bold text-xl self-start mb-10">
        Gestion de inventario
      </h1>
      <IngredientContainer />
      <GenericButton className="self-start">Agregar Ingrediente</GenericButton>
    </main>
  );
}
