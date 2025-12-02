"use client";
import OrderCard from "@/components/ui/OrderCard";
import { useState } from "react";
import { useEffect } from "react";
import { OrderService } from "@/services/ordersService";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useAppSelector } from "@/hooks/reduxHooks";
import { setOrders } from "@/store/orderSlice";
import Modal from "@/components/ui/Modal";
import OrderDetail from "@/components/ui/OrderDetail";
import { Order } from "@/types/order";
export default function OrdersContainer() {
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.orders);
  const [open, setOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order>();
  const fetchOrders = async () => {
    setError("");
    try {
      const orders = await OrderService.getAll();
      dispatch(setOrders(orders));
    } catch (err) {
      console.log(err);
      setError("No se pudieron cargar los pedidos");
    } finally {
    }
  };
  useEffect(() => {
    fetchOrders();
  }, [dispatch]);

  const onOpen = (order: Order) => {
    setCurrentOrder(order);
    setOpen(true);
  };

  return (
    <main className="w-full">
      {error && <p>{error}</p>}
      <h1 className="font-bold text-3xl">Gestion de pedidos</h1>
      <div className="flex items-center gap-3 mt-10">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} onOpen={onOpen} />
        ))}
        <Modal open={open} onClose={() => setOpen(false)}>
          {currentOrder && <OrderDetail order={currentOrder} />}
        </Modal>
      </div>
    </main>
  );
}
