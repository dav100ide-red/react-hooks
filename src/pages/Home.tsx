import { useState, useEffect, useRef, useMemo } from "react";
import Section from "../components/Section";

export function Home() {
  const [color, setColor] = useState<"orange" | "green">("orange");

  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 2000);
    return () => clearTimeout(timer); // Cleanup previous timer
  }, [count]);

  const inputEl = useRef<HTMLInputElement | null>(null);

  function handleClick() {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }

  const [number, setNumber] = useState(2);

  function cubeNum(n: number) {
    //mock heavy computation
    console.log("heavy calculation done!");
    return Math.pow(n, 3);
  }

  // const result = cubeNum(number);
  const result = useMemo(() => cubeNum(number), [number]);

  return (
    <>
      <Section heading="useState()" description="My fav color is">
        <h4>
          <span
            className={
              color === "orange" ? "text-orange-600" : "text-green-700"
            }
          >
            {color}
          </span>
        </h4>
        <button
          className="bg-slate-300"
          onClick={() => setColor(color === "orange" ? "green" : "orange")}
        >
          set {color === "orange" ? "green" : "orange"}
        </button>
      </Section>
      <Section heading="useEffect()">
        <h4>render time {count}</h4>
      </Section>
      <Section heading="useRef()">
        <input ref={inputEl} type="text" />
        <button onClick={handleClick}>click to focus</button>
      </Section>
      <Section heading="useMemo()">
        <input
          className="border border-orange"
          type="number"
          value={number}
          onChange={(e) => {
            setNumber(+e.target.value);
          }}
        />
        <h4 className="text-lg">
          (mock heavy computation) cube of number: {result}
        </h4>
      </Section>
    </>
  );
}
