import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <Outlet></Outlet>
      <footer>footer</footer>
    </>
  );
}
