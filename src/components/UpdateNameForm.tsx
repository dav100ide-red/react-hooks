import React from "react";
import { useActionState } from "react";
import { GenericLoader } from "./Genericloader";

type FormState = { name: string; age: number };

const updateName = async (
  previousState: FormState,
  formData: FormData
): Promise<FormState> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  const newName = formData.get("name") as string;
  const newAge = formData.get("age") as string;
  return {
    name: newName,
    age: newAge ? parseInt(newAge) : previousState.age,
  };
};

const UpdateNameForm: React.FC = () => {
  //[state]
  const [{ name, age }, formAction, isPending] = useActionState(updateName, {
    name: "pippo2",
    age: 5,
  });

  return (
    <div className="flex justify-center items-center py-2 bg-gray-100">
      <form
        action={formAction}
        className="bg-white p-2 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold text-center mb-3">Update Name</h2>
        <p className="text-center mb-4">
          Name: {name}, Age: {age}
        </p>
        <input
          name="name"
          type="text"
          required
          placeholder="Enter new name"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          name="age"
          type="number"
          required
          placeholder="Enter new age"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          disabled={isPending}
          className={`w-full p-2 rounded flex justify-center items-center  ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 text-white"
          }`}
        >
          {isPending ? <GenericLoader /> : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateNameForm;
