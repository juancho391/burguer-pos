"use client";
import { Order } from "@/types/order";
import { GenericButton } from "./genericButton";
import { useState } from "react";
import { Checkbox } from "@heroui/checkbox";
import OrderProductCard from "./OrderProductCard";
export default function OrderDetail({ order }: { order: Order }) {
  const [includeService, setIncludeService] = useState(false);

  return (
    <div className="w-full p-5">
      <h3 className="text-2xl font-bold">Pedido #{order.id}</h3>
      <label className="text-lg font-semibold">{order.customer}</label>
      <div className="border border-black/20 w-full "></div>
      <div>
        {order.order_products.map((product) => (
          <OrderProductCard key={product.id} product={product} />
        ))}
        <div className="border border-black/20 w-full "></div>
        <div className="flex flex-col justify-between w-full ">
          {(order.service_price > 0 || includeService) && (
            <div className="flex justify-between w-full py-2">
              <label>servicio </label>
              {order.service_price > 0 ? (
                <label>${order.service_price}</label>
              ) : (
                <label>{order.total_price * 0.1}</label>
              )}
            </div>
          )}
          <div className="flex justify-between w-full py-2">
            <label className="font-bold">Total</label>
            <label className="font-bold">${order.total_price}</label>
          </div>
        </div>
      </div>
      {order.is_paid ? (
        ""
      ) : (
        <div className="flex flex-col">
          <div className="flex justify-between">
            <label className="text-lg font-semibold">Incluir servicio</label>
            <Checkbox
              className="inline-block"
              size="sm"
              isSelected={includeService}
              onValueChange={setIncludeService}
            />
          </div>
          <GenericButton className="mt-3">Pagar</GenericButton>
        </div>
      )}
    </div>
  );
}
