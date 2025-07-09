import { Route, Routes } from "react-router-dom";
import { Home, Products } from "./modules";
import { useAppDispatch, useAppSelector } from "./stores/redux/hooks";
import { useEffect } from "react";
import { setUser, type User } from "./stores/redux/slices/authSlice";

interface AppComponent {
  user?: unknown;
}

function App({ user }: AppComponent) {
  const dispatch = useAppDispatch();

  const store = useAppSelector((state) => state);
  useEffect(() => {
    dispatch(setUser(user as User));
  }, [dispatch, user]);

  console.log(store);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="orders" element={<div>Orders</div>} />
    </Routes>
  );
}

export { App };
