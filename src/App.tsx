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

function App() {
  const routes = [
    { path: "/home", label: "Home", element: <Home /> },
    { path: "/hooks1", label: "hooks1", element: <Hooks1 /> },
    { path: "/hooks2", label: "hooks2", element: <Hooks2 /> },
  ] as const;

  return (
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
  );
}

export default App;
