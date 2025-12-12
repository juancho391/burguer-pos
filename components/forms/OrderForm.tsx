import { useState } from "react";
import { Card } from "../ui/Card";
import { GenericInput } from "../ui/GenericInput";
import { GenericButton } from "../ui/genericButton";
export default function OrderForm({
  onSubmit,
  error,
}: {
  onSubmit: (data: { customer: string }) => void;
  error?: string;
}) {
  const [formData, setFormData] = useState({
    customer: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.customer) return;
    onSubmit(formData);
    e.currentTarget.reset();
  };

  return (
    <Card>
      <form className="flex gap-3 items-center" onSubmit={handleCreateOrder}>
        <GenericInput
          name="customer"
          placeholder="Nombre del cliente"
          type="text"
          onChange={handleChange}
        />
        <GenericButton className="cursor-pointer hover:scale-110" type="submit">
          Crear Pedido
        </GenericButton>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </Card>
  );
}
