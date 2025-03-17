import Login from "./components/auth/login";
import Register from "./components/auth/register/";

import Header from "./components/header";

import Information from "./Information";
import MainWebpage from "./MainWebpage";
import DriverPortal from "./driverPortal";
import Map from "./Map";
import CheckoutPage from "./checkoutPage"
import ConfirmationPage from "./ConfirmationPage";
import ProductPage from "./ProductPage"

import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";


function App() {
  const routesArray = [
    {
      path: "*",
      element: <Information />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Information />,
    },
    {
      path: "/",
      element: <Information />,
    },
    {
      path: "/select",
      element: <MainWebpage/>,
    },
    {
      path: "/driverPortal",
      element: <DriverPortal />,
    },
    {
      path: "/find",
      element: <Map />,
    },
    {
      path: "/checkout",
      element: <CheckoutPage />
    },
    {
      path: "/confirmation",
      element: <ConfirmationPage />
    },
    {
      path: "/products",
      element: <ProductPage />
    },
    
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
