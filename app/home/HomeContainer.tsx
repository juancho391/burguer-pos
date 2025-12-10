"use client";
import useAuthGuard from "@/hooks/useAuthGuard";
export default function HomeContainer() {
  const { loading } = useAuthGuard();
  return (
    <main>
      {loading && (
        <div className="w-full h-screen flex items-center justify-center">
          <p className="text-2xl font-bold">Loading...</p>
        </div>
      )}
      <h1>Home</h1>
    </main>
  );
}
