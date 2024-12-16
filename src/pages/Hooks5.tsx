import { useOptimistic, useState } from "react";
import Section from "../components/Section";
import { Todo } from "../types/todo.type";

export default function Hooks5() {
  const [todos, setTodos] = useState<Todo[]>([
    { title: "gym", pending: false, id: crypto.randomUUID() },
  ]);
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    todos,
    todosReducer
  );

  async function formAction(formData: FormData) {
    const todoTitle = formData.get("title") as string;
    // settaggio ottimista
    const optimisticTodo: Todo = {
      title: todoTitle,
      id: crypto.randomUUID(),
      pending: true,
    };
    setOptimisticTodos({ type: "add", payload: optimisticTodo });

    // settaggio reale
    const newTodo = await createTodo(todoTitle);
    setTodos((prev) => [...prev, newTodo]);
  }
  return (
    <>
      <Section
        heading="useOptimistic()"
        description="useful to give to the user immediate feedback, even without receiving the res from the server. Once the server-data arrived [optimisticData, ] of useOptimistic() re-renders and synchronise itself with the provided `passthrough`"
      >
        <form
          action={formAction}
          className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto space-y-4"
        >
          <label className="block text-gray-700 font-medium">
            Title
            <input
              type="text"
              name="title"
              required
              className="mt-1 p-1 block w-full border bg-indigo-100 rounded-lg border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Create
          </button>
        </form>
        <ul className="mt-6 space-y-2 max-w-sm mx-auto">
          {optimisticTodos.map((t, index) => (
            <li
              key={index}
              className={`p-3 rounded-md shadow-sm ${
                t.pending
                  ? "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-400"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {t.title}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

const todosReducer = (
  state: Todo[],
  action: { type: "add"; payload: Todo }
) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
  }
};

//--------------------------mock server---------------------------------------
function createTodo(title: string): Promise<Todo> {
  const todo = {
    title: `${title} from server`,
    id: crypto.randomUUID(),
    pending: false, //coming from a server so it's not pending
  };
  return wait(todo, 2000);
}

function wait<T>(value: T, duration: number): Promise<T> {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(value), duration);
  });
}
