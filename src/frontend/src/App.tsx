import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import Assessment from "./pages/Assessment";
import Crosswalk from "./pages/Crosswalk";
import Dashboard from "./pages/Dashboard";
import Evidence from "./pages/Evidence";
import Reports from "./pages/Reports";
import Wizard from "./pages/Wizard";

// Root Route
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.155 0.03 260)",
            border: "1px solid oklch(0.25 0.04 255)",
            color: "oklch(0.94 0.012 220)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "12px",
          },
        }}
      />
    </Layout>
  ),
});

// Routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Dashboard,
});

const crosswalkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/crosswalk",
  component: Crosswalk,
});

const assessmentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/assessment",
  component: Assessment,
});

const wizardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wizard",
  component: Wizard,
});

const evidenceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/evidence",
  component: Evidence,
});

const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports",
  component: Reports,
});

// Router
const routeTree = rootRoute.addChildren([
  indexRoute,
  crosswalkRoute,
  assessmentRoute,
  wizardRoute,
  evidenceRoute,
  reportsRoute,
]);

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
