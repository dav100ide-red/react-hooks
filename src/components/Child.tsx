import { useContext } from "react";
import GrandChild from "./GrandChild";
import { Hooks1StateContext } from "../contexts/Hooks1StateContext";

export default function Child() {
  const { isRed } = useContext(Hooks1StateContext);

  return (
    <div className={`p-3 rounded-md ${isRed ? "bg-red-400" : "bg-blue-400"}`}>
      CHILD component
      <GrandChild />
    </div>
  );
}
