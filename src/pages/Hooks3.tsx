import { useState, useTransition } from "react";
import Section from "../components/Section";
import { GenericLoader } from "../components/Genericloader";
import { useResponsiveBreakpoint } from "../hooks/useResponsiveBreakpoint";

export default function Hooks3() {
  const [isPending, startTransition] = useTransition();
  const breakpoint = useResponsiveBreakpoint();

  const [input, setInput] = useState("");
  const [list, setList] = useState([] as string[]);

  const LIST_SIZE = 20_000 as const;
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    startTransition(() => {
      // low priority, tells React to only work on it, when it no longer has high-priority tasks
      const l = [];
      for (let i = 0; i < LIST_SIZE; i++) {
        // immense calculation
        l.push(e.target.value);
      }
      setList(l);
    });

    // -----------------------------------------------------------------------------------------------------
  }
  return (
    <>
      <Section
        heading="useSyncExternalStore() & custom hook: useResponsiveBreakpoint()"
        description="useful scenario: when a data source is mutable and external to React (i.g. browser api..)"
      >
        <div className="bold text-2xl">{breakpoint}</div>
      </Section>

      <Section
        heading="useTransition()"
        description="makes the expensive work in the background, priotizing more important task (user experience reltated ui)"
      >
        <div>
          <input
            className="border mb-2"
            type="text"
            value={input}
            onChange={handleChange}
          />
          {isPending ? (
            <GenericLoader />
          ) : (
            list.map((item, i) => <div key={i}>{item}</div>)
          )}
        </div>
      </Section>
    </>
  );
}
