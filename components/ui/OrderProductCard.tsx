import { Product } from "@/types/product";
import { PlusCircleIcon, MinusCircleIcon } from "lucide-react";

export default function OrderProductCard({
  product,
  isPaid,
  addProduct,
  removeProduct,
}: {
  product: Product;
  isPaid: boolean;
  addProduct: (product_id: number) => void;
  removeProduct: (product_id: number) => void;
}) {
  return (
    <div className="flex  items-center w-full py-3 justify-between">
      <div className="flex flex-col items-start w-1/5">
        <label className="font-semibold">{product.name}</label>
        <label className="text-sm">${product.unit_price}</label>
      </div>
      <div
        className={`flex items-center justify-evenly p-1 ${
          !isPaid ? "gap-2 font-bold bg-gray-400/30 rounded-full" : ""
        }`}
      >
        {!isPaid && (
          <button
            className="cursor-pointer"
            onClick={() => removeProduct(product.id)}
          >
            <MinusCircleIcon color="gray" />
          </button>
        )}
        <label className="text-md">{product.quantity}x</label>
        {!isPaid && (
          <button
            className="cursor-pointer"
            onClick={() => addProduct(product.id)}
          >
            <PlusCircleIcon color="gray" />
          </button>
        )}
      </div>
      <div className="font-semibold">
        ${product.quantity * product.unit_price}
      </div>
    </div>
  );
}
