"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useAction, useQuery } from "convex/react";
import { QuestionFrom } from "./question-form";

export default function ChatPanel({
  documentId,
}: {
  documentId: Id<"documents">;
}) {
  const chats = useQuery(api.chats.getChatsForDocument, { documentId });
  //   const askQuestion = useAction(api.documents.askQuestion);
  return (
    <div className="bg-gray-900 flex flex-col gap-2 p-6 rounded-xl">
      <div className="h-[50vh] overflow-y-auto flex flex-col gap-2">
        <div className="bg-slate-950 rounded p-2 w-max">
          Ask any question using AI about this document below:
        </div>
        {chats?.map((chat) => (
          <div
            key={chat._id}
            className={cn(
              {
                "bg-slate-800 text-right self-end w-max max-w-[70vh]":
                  chat.isHuman,
                "bg-slate-950": !chat.isHuman,
              },
              "rounded p-2 whitespace-pre-line"
            )}
          >
            {chat.text}
          </div>
        ))}
      </div>
      <div className="flex gap-1 justify-end">
        <QuestionFrom documentId={documentId} />
      </div>
    </div>
  );
}
