import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import { HeaderActions } from "./header-actions";
import Link from "next/link";
import { OrganizationSwitcher } from "@clerk/nextjs";

export function Header() {
  return (
    <div className="bg-slate-900">
      <div className="container mx-auto items-center flex justify-between p-4">
        <div className="flex gap-12 items-center">
          <Link href="/" className="flex items-center gap-4 text-2xl">
            <Image
              src="/logo.jpeg"
              className="rounded"
              width={40}
              height={40}
              alt="an image of a brain"
            />
            BigBrain
          </Link>
          <nav className="flex items-center gap-8">
            <OrganizationSwitcher />
            <Link className="hover:text-slate-300" href="/dashboard">
              Dashboard
            </Link>
          </nav>
        </div>
        <div className="flex gap-8 items-center">
          <ModeToggle />
          <HeaderActions />
        </div>
      </div>
    </div>
  );
}
