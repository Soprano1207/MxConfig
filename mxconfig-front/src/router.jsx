import { createBrowserRouter } from "react-router-dom";
import Template from "./layouts/Template";
import Authorization from "./pages/Authorization/Authorization";
import Profile from "./pages/Profile/Profile";
import Main from "./layouts/Main";
import Components from "./pages/Components/Components";
import Mybuilds from "./pages/Mybuilds/Mybuilds";
import { Configurator } from "./pages/Configurator/Configurator";

export default createBrowserRouter([
  {
    path: "/",
    element: <Template><Main /></Template>,
  },
  {
    path: "/auth",
    element: <Authorization />,
  },
  {
    path: "/profile",
    element:
      <Template>
        <Profile />
      </Template>,
  },
  {
    path: "/components/:componentType",
    element:
      <Template>
        <Components />
      </Template>,
  },
  {
    path: "/mybuilds",
    element:
      <Template>
        <Mybuilds />
      </Template>,
  },
  {
    path: "/configurator",
    element:
      <Template>
        <Configurator />
      </Template>,
  },
  {
    path: "/configurator/:componentType",
    element:
      <Template>
        <Components />
      </Template>,
  },

])