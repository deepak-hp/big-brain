"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteNoteButton({ noteId }: { noteId: Id<"notes"> }) {
  const [isLoading, setIsLoading] = useState(false);
  const deleteNote = useMutation(api.notes.deleteNote);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <AlertDialogTrigger asChild>
        <Button
          className="absolute -top-6 -right-6"
          variant="destructive"
          size="icon"
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete this note?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Your note can not be recovered after it&apos;s been deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoadingButton
            onClick={() => {
              setIsLoading(true);
              deleteNote({ noteId })
                .then(() => {
                  setIsOpen(false);
                  router.push("/dashboard/notes");
                })
                .finally(() => setIsLoading(false));
            }}
            isLoading={isLoading}
            loadingText="Deleting..."
          >
            Delete
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
