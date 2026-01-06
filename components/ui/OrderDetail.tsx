"use client";
import { Order } from "@/types/order";
import { GenericButton } from "./genericButton";
import { Key, useState } from "react";
import { Checkbox } from "@heroui/checkbox";
import OrderProductCard from "./OrderProductCard";
import DropDownMenu from "./DropDownMenu";
import { Product } from "@/types/product";

export default function OrderDetail({
  order,
  products,
  onSelect,
  closeOrder,
  deleteOrder,
  productError,
  removeProduct,
  addProduct,
}: {
  order: Order;
  products: Product[];
  onSelect: (key: Key) => void;
  closeOrder: (order: Order, includeService: boolean) => void;
  deleteOrder: (order: Order) => void;
  productError: string;
  addProduct: (product_id: number) => void;
  removeProduct: (product_id: number) => void;
}) {
  const [includeService, setIncludeService] = useState(false);

  const productItems = products.map((product) => {
    return {
      label: product.name,
      key: product.id,
    };
  });

  return (
    <div className="w-full p-5">
      <h3 className="text-2xl font-bold ">Pedido #{order.id}</h3>
      <label className="text-lg font-semibold ">{order.customer}</label>
      <div className="border border-black/20 w-full "></div>
      <div>
        {order.order_products.map((product) => (
          <OrderProductCard
            key={product.id}
            product={product}
            isPaid={order.is_paid}
            addProduct={addProduct}
            removeProduct={removeProduct}
          />
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
          {!order.is_paid && (
            <div className="self-end rounded-full my-2 h-full">
              <DropDownMenu items={productItems} onSelect={onSelect} />
            </div>
          )}
          {productError && (
            <div className="self-end">
              <p className="text-red-500"></p>
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
        <div className="flex flex-col py-2 w-full">
          <div className="flex justify-between">
            <label className="text-lg font-semibold">Incluir servicio</label>
            <Checkbox
              className="inline-block"
              size="sm"
              isSelected={includeService}
              onValueChange={setIncludeService}
            />
          </div>
          <GenericButton
            onClick={() => closeOrder(order, includeService)}
            className="mt-3"
          >
            Pagar
          </GenericButton>
          <GenericButton
            onClick={() => deleteOrder(order)}
            className="mt-3 bg-red-400 hover:bg-red-500"
          >
            Eliminar
          </GenericButton>
        </div>
      )}
    </div>
  );
}
