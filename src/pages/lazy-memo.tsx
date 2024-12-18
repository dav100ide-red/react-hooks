import { lazy, memo, Suspense, useState } from "react";
import Section from "../components/Section";

const LazyGrandChild = lazy(() => import("../components/GrandChild.js"));

const Greeting = memo(function Greeting({ name }: { name: string }) {
  console.log("Greeting was rendered at", new Date().toLocaleTimeString());
  return (
    <h3>
      Hello{name && ", "}
      {name}!
    </h3>
  );
});

export default function LazyMemo() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  return (
    <>
      <Section heading="lazy">
        <Suspense fallback="loading">
          <LazyGrandChild />
        </Suspense>
      </Section>
      <Section heading="memo">
        <label>
          Name{": "}
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Address{": "}
          <input value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <Greeting name={name} />
      </Section>
    </>
  );
}
