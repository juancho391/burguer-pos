import { AuthService } from "@/services/AuthService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./reduxHooks";
import { logout, loginSuccess } from "@/store/authSlice";

export default function useAuthGuard() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const verifyToken = async (token: string) => {
    try {
      const response = await AuthService.verify(token);
      return response.status === 200;
    } catch (err) {
      return false;
    }
  };

  const refreshToken = async (refresh: string) => {
    try {
      const response = await AuthService.refresh(refresh);
      return response;
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        const refresh = localStorage.getItem("refresh");

        if (token) {
          const isAuth = await verifyToken(token);
          if (isAuth) {
            dispatch(loginSuccess({ token, user, refresh }));
            setLoading(false);
            return;
          }
        }

        if (refresh) {
          const response = await refreshToken(refresh);
          if (response && response.status === 200) {
            dispatch(
              loginSuccess({
                token: response.data.access,
                user,
                refresh,
              })
            );
            setLoading(false);
            return;
          }
        }

        dispatch(logout());
        router.push("/login");
      } catch (err) {
        dispatch(logout());
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, dispatch]);

  return { loading };
}
