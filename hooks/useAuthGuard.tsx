import { AuthService } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function useAuthGuard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found");
          router.push("/login");
          return;
        }
        const response = await AuthService.verify(token!);
        console.log(response);
        if (response.status !== 200) {
          console.log("Token invalid");
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }
      } catch (err) {
        router.push("/login");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  return {
    loading,
  };
}
