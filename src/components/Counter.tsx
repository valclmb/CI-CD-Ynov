import { useState } from "react";

export const Counter = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <button onClick={() => setCounter((curr) => curr + 1)}>COUNTER</button>
      <div data-testid="count">{counter}</div>
    </div>
  );
};
