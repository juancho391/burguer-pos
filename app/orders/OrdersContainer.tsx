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
import useAuthGuard from "@/hooks/useAuthGuard";
export default function OrdersContainer() {
  const { loading } = useAuthGuard();
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

  return (
    <main className="w-full">
      {loading && (
        <div className="">
          <p>Loading...</p>
        </div>
      )}
      <h1 className="font-bold text-3xl">Gestion de pedidos</h1>
      <div className="flex items-center gap-3 mt-10">
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
            />
          )}
        </Modal>
      </div>
      {orderError && <p className="text-red-500">{orderError}</p>}
    </main>
  );
}
