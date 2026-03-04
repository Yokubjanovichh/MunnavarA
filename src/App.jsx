import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import Orders from "@/pages/Orders";
import Products from "@/pages/Products";
import ProductCreate from "@/pages/ProductCreate";
import Clients from "@/pages/Clients";
import Sales from "@/pages/Sales";
import WithdrawRequests from "@/pages/WithdrawRequests";
import Promocodes from "@/pages/Promocodes";
import Reviews from "@/pages/Reviews";
import Couriers from "@/pages/Couriers";
import Settings from "@/pages/Settings";
import Transport from "@/pages/Transport";
import Login from "@/pages/Login";
import { useSelector } from "react-redux";
import { selectIsAuthed } from "@/features/auth/authSlice";
import { useGetMeQuery } from "@/services/profileApi";

export default function App() {
  const isAuthed = useSelector(selectIsAuthed);
  useGetMeQuery(undefined, { skip: !isAuthed });

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={isAuthed ? <Layout /> : <Navigate to="/login" replace />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/withdraw-requests" element={<WithdrawRequests />} />
        <Route path="/products" element={<Products />} />
        <Route path="/create" element={<ProductCreate />} />
        <Route path="/promocodes" element={<Promocodes />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/couriers" element={<Couriers />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={isAuthed ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}
