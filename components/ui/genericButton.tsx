export function GenericButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition"
    >
      {children}
    </button>
  );
}
