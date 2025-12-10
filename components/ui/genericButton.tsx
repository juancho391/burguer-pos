import { cn } from "@/lib/utils";
export function GenericButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "bg-orange-500/80 text-white px-4 py-2 rounded-xl hover:bg-orange-500 transition",
        className
      )}
    >
      {children}
    </button>
  );
}
