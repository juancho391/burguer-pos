import { AuthService } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./reduxHooks";
import { logout } from "@/store/authSlice";
import { loginSuccess } from "@/store/authSlice";
export default function useAuthGuard() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!token) {
          const refresh = localStorage.getItem("refresh");
          if (refresh) {
            console.log("Refreshing token");
            const response = await AuthService.refresh(refresh);
            if (response.status === 200) {
              dispatch(
                loginSuccess({
                  token: response.data.access,
                  user: user,
                  refresh: refresh,
                })
              );
              return;
            }
          }
          dispatch(logout());
          console.log("No access/refresh found");
          router.push("/login");
          return;
        }
        const response = await AuthService.verify(token!);
        if (response.status !== 200) {
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
  }, [router, dispatch]);

  return {
    loading,
  };
}
