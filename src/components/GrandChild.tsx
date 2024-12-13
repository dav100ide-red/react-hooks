import { useContext } from "react";
import { Hooks1StateContext } from "../contexts/Hooks1StateContext";

export default function GrandChild() {
  const { isRed } = useContext(Hooks1StateContext);

  return (
    <div className={`p-1 rounded-sm ${isRed ? "bg-red-200" : "bg-blue-200"}`}>
      GrandChild component
    </div>
  );
}
