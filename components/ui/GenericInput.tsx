export function GenericInput({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="border border-gray-200 rounded-lg px-3 py-2 w-full "
    />
  );
}
