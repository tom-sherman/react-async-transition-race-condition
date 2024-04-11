"use client";

import { useState, useTransition } from "react";

let first = true;

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          const newSearch = e.target.value;
          setSearch(newSearch);
          startTransition(async () => {
            if (first) {
              first = false;
              await new Promise((resolve) => setTimeout(resolve, 500));
            }
            setResults(await getResults(newSearch));
          });
        }}
      />
      {isPending ? "Loading..." : null}
      <ul>
        {results.map((result) => (
          <li key={result}>{result}</li>
        ))}
      </ul>
    </div>
  );
}

async function getResults(query: string) {
  await new Promise((resolve) => setTimeout(resolve, 250));

  return ["a", "aa", "ab", "b", "bc"].filter((result) =>
    result.includes(query)
  );
}
