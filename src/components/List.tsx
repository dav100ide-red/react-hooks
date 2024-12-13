import { useEffect, useState } from "react";

interface GetNumbersFunction {
  (): number[];
}

export default function List({ getItems }: { getItems: GetNumbersFunction }) {
  const [items, setItems] = useState([] as number[]);

  useEffect(() => {
    setItems(getItems());
    console.log("updating items");
  }, [getItems]);

  return items.map((item, _) => <div key={_}>{item}</div>);
}
