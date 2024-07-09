"use client";
import { useState } from "react";
import { SearchForm } from "./serch-form";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function SearchPage() {
  const [results, setResults] =
    useState<typeof api.search.searchAction._returnType>(null);
  return (
    <main className="space-y-8 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Search</h1>
      </div>
      <SearchForm setResults={setResults} />
      <ul className="flex flex-col gap-4">
        {results?.map((result) => {
          if (result.type === "notes") {
            return (
              <Link
                href={`/dashboard/notes/${result.record._id}`}
                key={result?.record?._id}
              >
                <li className="hover:bg-slate-700 bg-slate-800 rounded p-4 whitespace-pre-line">
                  Type: Note {result.score}
                  <br />
                  <p>{result?.record?.text.substring(0, 500) + "..."}</p>
                </li>
              </Link>
            );
          } else {
            return (
              <Link
                href={`/dashboard/documents/${result.record._id}`}
                key={result?.record?._id}
              >
                <li className="hover:bg-slate-700 bg-slate-800 rounded p-4 whitespace-pre-line">
                  Type: Document {result.score}
                  <br />
                  <p>{result?.record?.title}</p>
                  <p>
                    {result?.record?.description?.substring(0, 500) + "..."}
                  </p>
                </li>
              </Link>
            );
          }
        })}
      </ul>
    </main>
  );
}
