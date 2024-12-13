export type Hobby = "coding" | "work out" | "gaming";

export type User = {
  name: string;
  age: number;
  hobbies: Set<Hobby>;
};
