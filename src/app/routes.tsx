import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { AdminLayout } from "./components/AdminLayout";
import { Home } from "./pages/Home";
import { Schedule } from "./pages/Schedule";
import { Services } from "./pages/Services";
import { About } from "./pages/About";
import { Prayer } from "./pages/Prayer";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "schedule", Component: Schedule },
      { path: "services", Component: Services },
      { path: "about", Component: About },
      { path: "prayer", Component: Prayer },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
    ],
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
]);
