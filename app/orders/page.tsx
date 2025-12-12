"use client";
import OrdersContainer from "./OrdersContainer";
import useAuthGuard from "@/hooks/useAuthGuard";
import Loading from "@/components/ui/Spinner";

export default function Orders() {
  const { loading } = useAuthGuard();
  if (loading) {
    return <Loading />;
  } else {
    return (
      <main className="w-full">
        <OrdersContainer />
      </main>
    );
  }
}
