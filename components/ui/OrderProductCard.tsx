import { Product } from "@/types/product";
import { PlusCircleIcon, MinusCircleIcon } from "lucide-react";

export default function OrderProductCard({ product }: { product: Product }) {
  return (
    <div className="flex  items-center w-full py-3 justify-between">
      <div className="flex flex-col items-start w-1/5">
        <label className="font-semibold">{product.name}</label>
        <label className="text-sm">${product.unit_price}</label>
      </div>
      <div className="flex items-center justify-evenly bg-gray-400/30 p-1 rounded-full gap-2">
        <button className="cursor-pointer">
          <MinusCircleIcon color="gray" />
        </button>
        <label className="text-md">{product.quantity}</label>
        <button className="cursor-pointer">
          <PlusCircleIcon color="gray" />
        </button>
      </div>
      <div className="font-semibold">
        ${product.quantity * product.unit_price}
      </div>
    </div>
  );
}
