"use client";
import OrderCard from "@/components/ui/OrderCard";
import { Key, useState } from "react";
import { OrderService } from "@/services/ordersService";
import { useAppSelector } from "@/hooks/reduxHooks";
import useOrders from "@/hooks/useOrders";
import Modal from "@/components/ui/Modal";
import OrderDetail from "@/components/ui/OrderDetail";
import { Order } from "@/types/order";
import useProducts from "@/hooks/useProducts";
import OrderForm from "@/components/forms/OrderForm";

export default function OrdersContainer() {
  const orders = useAppSelector((state) => state.orders.orders);
  const products = useAppSelector((state) => state.products.products);
  const [open, setOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);
  const { productError, fetchProducts } = useProducts();
  const { orderError, fetchOrders } = useOrders();

  const onOpen = async (order: Order) => {
    setCurrentOrderId(order.id);
    await fetchProducts();
    setOpen(true);
  };
  const onSelect = async (key: Key) => {
    try {
      await OrderService.addProduct(currentOrderId!, key as number, 1);
      await fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const removeProductOrder = async (product_id: number) => {
    try {
      await OrderService.removeProduct(currentOrderId!, product_id);
      await fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };
  const addProductOrder = async (product_id: number) => {
    try {
      await OrderService.addProduct(currentOrderId!, product_id, 1);
      await fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const closeOrder = async (order: Order, includeService: boolean) => {
    await OrderService.closeOrder(order.id, includeService);
    setOpen(false);
    await fetchOrders();
  };

  const deleteOrder = async (order: Order) => {
    await OrderService.deleteORder(order.id);
    setCurrentOrderId(null);
    setOpen(false);
    await fetchOrders();
  };

  const createOrder = async (data: { customer: string }) => {
    try {
      await OrderService.createOrder(data.customer);
      await fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-full">
      <div className="flex gap-3 justify-between w-full p-7 items-center">
        <h1 className="font-bold text-3xl">Gestion de pedidos</h1>
        <OrderForm onSubmit={createOrder} />
      </div>
      <div className="flex items-center gap-3 mt-5 flex-wrap px-7">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} onOpen={onOpen} />
        ))}
        <Modal open={open} onClose={() => setOpen(false)}>
          {currentOrderId && (
            <OrderDetail
              order={orders.find((order) => order.id === currentOrderId)!}
              products={products}
              onSelect={onSelect}
              closeOrder={closeOrder}
              deleteOrder={deleteOrder}
              productError={productError}
              addProduct={addProductOrder}
              removeProduct={removeProductOrder}
            />
          )}
        </Modal>
      </div>
      {orderError && <p className="text-red-500">{orderError}</p>}
    </main>
  );
}
