import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import { HeaderActions } from "./header-actions";

export function Header() {
  return (
    <div className="bg-slate-900">
      <div className="container mx-auto items-center flex justify-between p-4">
        <div className="flex items-center gap-4 text-2xl">
          <Image
            src="/logo.jpeg"
            className="rounded"
            width={50}
            height={50}
            alt="an image of a brain"
          />
          BigBrain
        </div>
        <div className="flex gap-8 items-center">
          <ModeToggle />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}
