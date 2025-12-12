"use client";
import LoginContainer from "./LoginContainer";
import Loading from "@/components/ui/Spinner";
import useAuthGuard from "@/hooks/useAuthGuard";

export default function Login() {
  const { loading } = useAuthGuard();

  if (loading) {
    return <Loading />;
  } else {
    return (
      <main className="flex justify-center h-screen w-screen items-center">
        <LoginContainer />
      </main>
    );
  }
}
