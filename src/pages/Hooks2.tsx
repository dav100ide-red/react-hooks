import { useId, useLayoutEffect, useReducer, useRef, useState } from "react";
import { Hobby, User } from "../types/user.type";
import Section from "../components/Section";

// Define Action Types
type UserAction =
  | { type: "incrementAge" }
  | { type: "addHobby"; payload: Hobby }
  | { type: "updateName"; payload: string };

// Define the Reducer
const userReducer = (state: User, action: UserAction): User => {
  switch (action.type) {
    case "incrementAge":
      return { ...state, age: state.age + 1 };
    case "addHobby":
      return { ...state, hobbies: state.hobbies.add(action.payload) };
    case "updateName":
      return { ...state, name: action.payload };
    default:
      console.error(`[userReducer] Action type  is not implemented`);
      return state; // Return current state if action is unhandled
  }
};

// Component Implementation
export default function Hooks2() {
  const initialUser: User = {
    name: "Franco",
    age: 30,
    hobbies: new Set(["coding", "work out"]),
  };

  const [state, dispatch] = useReducer(userReducer, initialUser);

  // Sample Handlers
  const incrementAge = () => dispatch({ type: "incrementAge" });
  const addHobby = (hobby: Hobby) =>
    dispatch({ type: "addHobby", payload: hobby });
  const updateName = (name: string) =>
    dispatch({ type: "updateName", payload: name });

  // -----------------------------------------------------------------------------------------------------------------------------------------------
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxWidth, setBoxWidth] = useState(0);

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (boxRef.current) {
        setBoxWidth(boxRef.current.offsetWidth);
      }
    };

    updateWidth(); // Initial update
    window.addEventListener("resize", updateWidth); // Update on resize

    return () => {
      window.removeEventListener("resize", updateWidth); // Cleanup
    };
  }, []);

  // -----------------------------------------------------------------------------------------------------------------------------------------------
  const id = useId();

  return (
    <>
      <Section
        heading="useReducer()"
        description="useReducer() instead of simple useState for REDUX pattern, and
            handling a set of actions in one place"
      >
        <div className="mt-2">
          <h4>User Info:</h4>
          <p>Name: {state.name}</p>
          <p>Age: {state.age}</p>
          <div className="flex gap-2">
            hoobies:
            <ul className="m-0 marker:text-gray-400">
              {[...state.hobbies].map((h) => (
                <li className="m-0" key={h}>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-2">
          <button
            onClick={incrementAge}
            className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
          >
            Increment Age
          </button>
          <button
            onClick={() => addHobby("gaming")}
            className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
          >
            Add Hobby (gaminig)
          </button>
          <button
            onClick={() => updateName("Mario")}
            className="bg-yellow-500 text-black px-2 py-1 rounded-md"
          >
            Update Name to Mario
          </button>
        </div>
      </Section>
      <Section
        heading="useLayoutEffect()"
        description="similar to useEffect(), it executes BEFORE the browser repaints the screen"
      >
        <div ref={boxRef} className="bg-blue-200 py-7 px-3 w-[40vw]">
          Resize me!
        </div>
        <p>box width: {boxWidth}</p>
      </Section>
      <Section
        heading="useId()"
        description="by using this hook, we ensure that we have unique IDs acrss SSR and client side rendering, preventing IDs collisions, plus it is DRY"
      >
        <div>
          <label htmlFor={id}>Enter your email</label>
          <input
            type="email"
            id={id}
            placeholder="pippo@gmail.com"
            className="border"
          />
        </div>
      </Section>
    </>
  );
}
