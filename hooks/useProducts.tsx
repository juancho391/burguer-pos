import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "./reduxHooks";
import { setProducts } from "@/store/productsSlice";
import { ProductService } from "@/services/productService";

export default function useProducts() {
  const [productError, setProductError] = useState("");
  const dispatch = useAppDispatch();

  const fetchProducts = useCallback(async () => {
    setProductError("");
    try {
      const products = await ProductService.getAll();
      dispatch(setProducts(products));
    } catch (err) {
      console.log(err);
      setProductError("No se pudieron cargar los productos");
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    productError,
    fetchProducts,
  };
}
