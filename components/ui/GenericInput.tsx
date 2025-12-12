import { cn } from "@/lib/utils";

export function GenericInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn("border border-gray-200 rounded-lg px-3 py-2", className)}
    />
  );
}
