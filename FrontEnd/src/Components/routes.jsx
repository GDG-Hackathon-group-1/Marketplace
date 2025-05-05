import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Contactus from "../Pages/Contactus";
import Home from "../Pages/Home";
import Page404 from "../Pages/Page404";
import AccountSettings from "../Pages/AccountSettings";
import ProductDetails from "../Pages/ProductDetails";
import Checkout from "../Pages/Checkout";
import Cart from "../Pages/Cart";
import Wishlist from "../Pages/Wishlist";
import About from "../Pages/About";
import Profile from "../Pages/Profile";
import ThankYouPage from "../Pages/Thankyou";
import { LogIn } from "lucide-react";
import { Registration } from "../Pages/Registration";
import LoginPage from "../Pages/login";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/contacus", element: <Contactus /> },
      { path: "/", element: <Home /> },
      { path: "*", element: <Page404 /> },
      { path: "productdetails", element: <ProductDetails /> },
      { path: "checkout", element: <Checkout /> },
      { path: "/wishlist", element: <Wishlist /> },
      { path: "/about", element: <About /> },
      { path: "/profile", element: <Profile /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <Registration /> },
      { path: "/Thankyou", element: <ThankYouPage /> },

      { path: "cart", element: <Cart /> },
    ],
  },
]);
export default routes;
//
