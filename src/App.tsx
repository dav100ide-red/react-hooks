import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import Hooks1 from "./pages/Hooks1";
import Hooks2 from "./pages/Hooks2";
import Hooks3 from "./pages/Hooks3";
import Hooks4 from "./pages/Hooks4";
import Hooks5 from "./pages/Hooks5";
import LazyMemo from "./pages/lazy-memo";
import Fetch from "./pages/Fetch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
  const routes = [
    { path: "/home", label: "Home", element: <Home /> },
    { path: "/hooks1", label: "hooks1", element: <Hooks1 /> },
    { path: "/hooks2", label: "hooks2", element: <Hooks2 /> },
    { path: "/hooks3", label: "hooks3", element: <Hooks3 /> },
    { path: "/hooks4", label: "hooks4", element: <Hooks4 /> },
    { path: "/hooks5", label: "hooks5", element: <Hooks5 /> },
    { path: "/lazymemo", label: "lazy & memo", element: <LazyMemo /> },
    { path: "/fetch", label: "fetch", element: <Fetch /> },
  ] as const;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-5 prose max-w-full">
        <BrowserRouter>
          <nav className="mb-5">
            {routes.map((l, index) => (
              <NavLink
                className="me-3 underline text-blue-500"
                key={index}
                to={l.path}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <Routes>
            <Route path="/" element={<Navigate to="/hooks2" replace />} />

            <Route element={<Layout />}>
              {routes.map((l, index) => (
                <Route key={index} path={l.path} element={l.element} />
              ))}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
