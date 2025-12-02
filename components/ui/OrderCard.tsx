import { Order } from "@/types/order";
import { ShoppingBag } from "lucide-react";

export default function OrderCard({
  order,
  onOpen,
}: {
  order: Order;
  onOpen: (order: Order) => void;
}) {
  return (
    <div
      className="w-1/3 border border-black rounded-lg min-h-40 flex  flex-col justify-center items-center gap-3 p-3  "
      onClick={() => onOpen(order)}
    >
      <div className="flex items-center justify-between w-full ">
        <div className="flex w-1/4 ">
          <div className="bg-orange-400/30 h-full p-1 rounded-sm mr-2">
            <ShoppingBag size={40} className="text-orange-500 " />
          </div>
          <div className="h-full">
            <p className="font-semibold">Pedido</p>
            <p className="font-semibold">#{order.id}</p>
          </div>
        </div>
        <div className="">
          <div
            className={`p-2 rounded-full ${
              order.is_paid ? "bg-red-400/50" : "bg-yellow-400/50"
            }`}
          >
            {order.is_paid ? (
              <p className="text-red-500">Cerrado</p>
            ) : (
              <p className="text-yellow-500">Abierto</p>
            )}
          </div>
        </div>
      </div>
      <div className="border border-black/20 w-full "></div>
      <div className="self-start p-3">
        <p>
          {order.order_products.map(
            (product) => ` ${product.quantity}x ${product.product_name}`
          )}
        </p>
      </div>
    </div>
  );
}
