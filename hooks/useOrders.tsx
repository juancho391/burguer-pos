import { useState, useEffect, useCallback } from "react";
import { useAppDispatch } from "./reduxHooks";
import { setOrders } from "@/store/orderSlice";
import { OrderService } from "@/services/ordersService";

export default function useOrders() {
  const [orderError, setOrderError] = useState("");
  const dispatch = useAppDispatch();

  const fetchOrders = useCallback(async () => {
    setOrderError("");
    try {
      const orders = await OrderService.getAll();
      dispatch(setOrders(orders));
    } catch (err) {
      console.error(err);
      setOrderError("No se pudieron cargar los pedidos");
    }
  }, [dispatch]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orderError,
    fetchOrders,
  };
}
