"use client";
import { useQuery } from "convex/react";
import CreateNoteButton from "./create-note-button";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";

export default function NotesLayout({ children }: { children: ReactNode }) {
  const organization = useOrganization();
  const notes = useQuery(api.notes.getNotes, {
    orgId: organization.organization?.id,
  });
  const { noteId } = useParams<{ noteId: Id<"notes"> }>();
  return (
    <main className="space-y-8 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Notes</h1>
        <CreateNoteButton />
      </div>
      {!notes ? (
        <div className="flex gap-4">
          <div className="w-[180px] space-y-4">
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
          </div>
          <div className="flex-1">
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      ) : null}
      {notes?.length === 0 ? (
        <div className=" p-12 h-auto flex justify-center flex-col items-center gap-8">
          <Image
            src="/documents.svg"
            width="250"
            height="250"
            alt="upload docs"
          />
          <h2 className="text-2xl">You have no notes</h2>
          <CreateNoteButton />
        </div>
      ) : null}
      {notes?.length ? (
        <div className="flex gap-12">
          <ul className="space-y-2 w[200px]">
            {notes?.map((note) => (
              <li
                key={note._id}
                className={cn("text-base hover:text-cyan-200", {
                  "text-cyan-300": note._id === noteId,
                })}
              >
                <Link href={`/dashboard/notes/${note._id}`}>
                  {note.text.length > 24
                    ? note.text.substring(0, 24) + "..."
                    : note.text}
                </Link>
              </li>
            ))}
          </ul>
          <div className="bg-slate-800 rounded p-4 w-full">{children}</div>
        </div>
      ) : null}
    </main>
  );
}
