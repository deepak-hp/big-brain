"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateNoteForm from "./create-note-form";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { btnIconStyles, btnStyles } from "@/styles/styles";
import { useToast } from "@/components/ui/use-toast";

export default function CreateNoteButton() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className={btnStyles}>
          <PlusIcon className={btnIconStyles} />
          Create Note
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Note</DialogTitle>
          <DialogDescription>
            Type what ever note you want to be searchable later on.
          </DialogDescription>
          <CreateNoteForm
            onNoteCreated={() => {
              setIsOpen(false);
              toast({
                title: "Note created",
                description: "your note has been created successfully",
              });
            }}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
