import { Spinner } from "@heroui/spinner";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Spinner label="cargando..." color="primary" />
    </div>
  );
}
