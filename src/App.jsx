import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import Home from "./component/Pages/Home/Home";
import Fruits from "./component/Pages/Fruits/Fruits";
import NavBar from "./component/NavBar/NavBar";
import Dairy from "./component/Pages/Dairy/Dairy";
import SeaFood from "./component/Pages/SeaFood/SeaFood";
import AllProducts from "./component/Pages/AllProducts/AllProducts";
import Footer from "./component/Footer/Footer";
import ScrollTop from "./ScrollTop";
import Cart from "./component/Cart/Cart";
import InvoicePage from "./component/InvoicePage/InvoicePage";
import ThankYou from "./component/ThankYou/ThankYou";
import ContactPage from "./component/Pages/Contact/ContactPage";
import AboutUs from "./component/Pages/AboutUs/AboutUs";
import Process from "./component/Pages/Process/Process";
import RegisterPage from "./component/Pages/Auth/RegisterPage/RegisterPage";
import LoginPage from "./component/Pages/Auth/LogInPage/LogInPage";
import AdminDashboard from "./component/Admin/Admin";
import ProductMangement from "./component/Admin/ProductsMangement";
import OrderManagement from "./component/Admin/OrderMangement";

import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";

export function PageNotFount() {
  return (
    <div className="min-h-screen flex items-center justify-center text-4xl font-bold text-red-500">
      404 | Page Not Found
    </div>
  );
}

function App() {
  const location = useLocation();
  const hideLayOutRoutes = [
    "/login",
    "/register",
    "/admin",
    "/admin/product",
    "/admin/order",
    "*",
  ];
  const hideLayOut = hideLayOutRoutes.includes(location.pathname);
  return (
    <>
      {!hideLayOut && <NavBar />}

      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/dairy" element={<Dairy />} />
        <Route path="/seafood" element={<SeaFood />} />
        <Route path="/allproduts" element={<AllProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/invoicepage" element={<InvoicePage />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/process" element={<Process />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute>
              <ProductMangement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/order"
          element={
            <ProtectedRoute>
              <OrderManagement />
            </ProtectedRoute>
          }
        />
        {/* <Route path="*" element={<PageNotFount />} /> */}
      </Routes>

      {!hideLayOut && <Footer />}
    </>
  );
}

export default App;
