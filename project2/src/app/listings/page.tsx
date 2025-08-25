import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function ListingsPage({ searchParams }: { searchParams: Record<string,string|undefined> }) {
  const catSlug = searchParams.cat as string | undefined;
  const q = searchParams.q as string | undefined;
  const where: any = { isActive: true };
  if (catSlug) where.category = { slug: catSlug };
  if (q) where.OR = [{ title: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }];

  const listings = await prisma.listing.findMany({
    where,
    include: { images: true, category: true, location: true, user: true },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    take: 50
  });

  return (
    <div className="space-y-4">
      <form className="flex gap-2">
        <input name="q" placeholder="Caută..." defaultValue={q} className="border rounded-xl px-3 py-2 w-full" />
        <button className="border rounded-xl px-3">Caută</button>
      </form>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {listings.map(l => (
          <Link key={l.id} href={`/listings/${l.id}`} className="border rounded-2xl overflow-hidden hover:shadow">
            <div className="aspect-video relative bg-gray-100">
              {l.images[0]?.url && <Image alt={l.title} src={l.images[0].url} fill className="object-cover" />}
            </div>
            <div className="p-3">
              <div className="font-medium line-clamp-2">{l.title}</div>
              <div className="text-sm text-gray-600">{l.price} {l.currency}</div>
              <div className="text-xs text-gray-500">{l.location.region}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
