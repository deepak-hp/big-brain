"use client";
import { useEffect, useState } from "react";
import { SearchForm } from "./serch-form";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { FileIcon, NotebookPen } from "lucide-react";

function SearchResult({
  url,
  type,
  score,
  text,
}: {
  url: string;
  type: string;
  score: number;
  text: string;
}) {
  return (
    <Link href={url}>
      <li className="space-y-4 dark:hover:bg-slate-700 dark:bg-slate-800 bg-slate-200 hover:bg-slate-300 rounded p-4 whitespace-pre-line">
        <div className="flex items-center justify-between">
          {type === "notes" ? (
            <div className="flex gap-1 text-xl items-center">
              <NotebookPen className="w-5 h-5" /> Note
            </div>
          ) : (
            <div className="flex gap-1 text-xl items-center">
              <FileIcon className="w-5 h-5" /> Document
            </div>
          )}
          <div className="text-sm">Relevancy of {score.toFixed(2)}</div>
        </div>

        <div>{text + "..."}</div>
      </li>
    </Link>
  );
}

export default function SearchPage() {
  const [results, setResults] =
    useState<typeof api.search.searchAction._returnType>(null);
  useEffect(() => {
    const storedResults = localStorage.getItem("searchResults");
    if (!storedResults) return;
    setResults(JSON.parse(storedResults));
  }, []);
  return (
    <main className="space-y-8 w-full pb-24">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Search</h1>
      </div>
      <SearchForm
        setResults={(searchResults) => {
          setResults(searchResults);
          localStorage.setItem("searchResults", JSON.stringify(searchResults));
        }}
      />
      <ul className="flex flex-col gap-4">
        {results?.map((result) => {
          if (result.type === "notes") {
            return (
              <SearchResult
                type="notes"
                key={result?.record._id}
                url={`/dashboard/notes/${result.record._id}`}
                score={result.score}
                text={result?.record?.text.substring(0, 500)}
              />
            );
          } else {
            return (
              <SearchResult
                type="documents"
                key={result?.record._id}
                url={`/dashboard/documents/${result.record._id}`}
                score={result.score}
                text={
                  result?.record?.title +
                  ": " +
                  result?.record?.description?.substring(0, 500)
                }
              />
            );
          }
        })}
      </ul>
    </main>
  );
}
