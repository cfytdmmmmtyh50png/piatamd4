"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link href="/" className="text-xl font-bold">Piata.md</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link className={pathname?.startsWith('/listings') ? 'font-semibold' : ''} href="/listings">Anunțuri</Link>
          <Link href="/new">Publică anunț</Link>
          <Link href="/messages">Mesaje</Link>
          <Link href="/favorites">Favorite</Link>
        </nav>
        <div className="ml-auto">
          <Link href="/auth/signin" className="px-3 py-1.5 rounded-lg border">Intră</Link>
        </div>
      </div>
    </header>
  );
}
