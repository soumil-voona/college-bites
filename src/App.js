import Login from "./components/auth/login";
import Register from "./components/auth/register/";

import Header from "./components/header";
import Home from "./components/home"

import Information from "./Information";
import MainWebpage from "./MainWebpage";
import DriverPortal from "./driverPortal";
import Map from "./Map";

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
