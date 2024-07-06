"use client";
import { useQuery } from "convex/react";
import CreateNoteButton from "./create-note-button";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function NotesPage() {
  const notes = useQuery(api.notes.getNotes);
  return (
    <main className="space-y-8 w-full">
      <div className="">Please select a note</div>
    </main>
  );
}
