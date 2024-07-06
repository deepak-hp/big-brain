"use client";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { DocumentCard } from "./document-card";
import UploadDocumentButton from "./upload-document-button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  const documents = useQuery(api.documents.getDocuments);
  return (
    <main className="space-y-8 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">My Documents</h1>
        <UploadDocumentButton />
      </div>
      {!documents && (
        <div className="grid grid-cols-4 gap-8">
          {new Array(8).fill("").map((_, i) => (
            <Card
              key={i}
              className="h-[200px] p-6 flex flex-col justify-between"
            >
              <Skeleton className="h-[30px] rounded" />
              <Skeleton className="h-[30px] rounded" />
              <Skeleton className=" w-[80px] h-[40px] rounded" />
            </Card>
          ))}
        </div>
      )}

      {documents && documents.length === 0 ? (
        <div className=" p-12 h-auto flex justify-center flex-col items-center gap-8">
          <Image
            src="/documents.svg"
            width="250"
            height="250"
            alt="upload docs"
          />
          <h2 className="text-2xl">You have no document</h2>
          <UploadDocumentButton />
        </div>
      ) : null}

      {documents && documents.length ? (
        <div className="grid grid-cols-4 gap-8">
          {documents?.map((doc) => (
            <DocumentCard key={doc._id} document={doc} />
          ))}
        </div>
      ) : null}
    </main>
  );
}
