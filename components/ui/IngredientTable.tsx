import { Ingredient } from "@/types/ingredient";
import { Trash, PlusIcon, MinusIcon } from "lucide-react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";
export default function IngredientTable({
  ingredients,
  isLoading,
  onIncrease,
  onDecrease,
  onDelete,
}: {
  ingredients: Ingredient[];
  isLoading: boolean;
  onIncrease: (ingredient: Ingredient) => void;
  onDecrease: (ingredient: Ingredient) => void;
  onDelete: (ingredient: Ingredient) => void;
}) {
  return (
    <Table
      aria-label="Tabla de ingredientes"
      classNames={{
        table: "border border-gray-300 rounded-lg",
        thead: "bg-gray-100 ",
        th: "border-b border-gray-300 px-4 py-2 text-left",
        td: "border-b border-gray-200 px-4 py-2",
        tr: "hover:bg-gray-50 transition-colors",
      }}
    >
      <TableHeader>
        <TableColumn key="name" align="start">
          Ingrediente
        </TableColumn>
        <TableColumn key="stock" align="start">
          Stock
        </TableColumn>
        <TableColumn key="reposition_point" align="start">
          Nivel de alerta
        </TableColumn>
        <TableColumn key="status" align="start">
          Acciones
        </TableColumn>
      </TableHeader>
      <TableBody
        items={ingredients}
        isLoading={isLoading}
        loadingContent={
          <Spinner label="Cargando..." color="warning" size="lg" />
        }
      >
        {(ingredient) => (
          <TableRow key={ingredient.name}>
            <TableCell>{ingredient.name}</TableCell>
            <TableCell>{ingredient.stock}</TableCell>
            <TableCell>{ingredient.reposition_point}</TableCell>
            <TableCell>
              <button
                onClick={() => {
                  onIncrease(ingredient);
                }}
                className="cursor-pointer"
              >
                <PlusIcon className="text-green-400" />
              </button>
              <button
                onClick={() => {
                  onDecrease(ingredient);
                }}
                className="cursor-pointer"
              >
                <MinusIcon className="text-yellow-300" />
              </button>
              <button
                onClick={() => {
                  onDelete(ingredient);
                }}
                className="cursor-pointer"
              >
                <Trash className="text-red-500" />
              </button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
