"use client";
import IngredientContainer from "./IngredientContainer";
import Loading from "@/components/ui/Spinner";
import useAuthGuard from "@/hooks/useAuthGuard";

export default function Ingredients() {
  const { loading } = useAuthGuard();
  if (loading) {
    return <Loading />;
  } else {
    return (
      <main className="w-full flex flex-col items-center p-5">
        <h1 className="font-bold text-xl self-start mb-10">
          Gestion de inventario
        </h1>
        <IngredientContainer isLoading={loading} />
      </main>
    );
  }
}
