"use client";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Image from "next/image";

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
        <div>
          <Unauthenticated>
            <SignInButton />
          </Unauthenticated>
          <Authenticated>
            <div className="flex gap-8">
              <ModeToggle />
              <UserButton />
            </div>
          </Authenticated>
        </div>
      </div>
    </div>
  );
}
