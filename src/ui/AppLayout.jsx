import { Outlet } from "react-router-dom";
import Navbar from "../features/Navbar/Navbar";

export default function AppLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}
