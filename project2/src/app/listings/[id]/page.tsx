import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function ListingDetails({ params }: { params: { id: string } }) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    include: { images: true, user: true, location: true, category: true }
  });
  if (!listing) return <div>Nu a fost găsit.</div>;
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <div className="aspect-video relative bg-gray-100 rounded-2xl overflow-hidden">
          {listing.images[0]?.url && <Image alt={listing.title} src={listing.images[0].url} fill className="object-cover" />}
        </div>
        <div className="rounded-2xl border p-4">
          <h1 className="text-2xl font-semibold">{listing.title}</h1>
          <div className="text-lg">{listing.price} {listing.currency}</div>
          <div className="text-sm text-gray-600">Categoria: {listing.category.name} • {listing.location.region}</div>
          <p className="mt-3 whitespace-pre-wrap">{listing.description}</p>
        </div>
      </div>
      <aside className="space-y-4">
        <div className="rounded-2xl border p-4">
          <div className="font-medium">Vânzător</div>
          <div className="text-sm text-gray-700">{listing.user.name || listing.user.email}</div>
        </div>
        <div className="rounded-2xl border p-4">
          <a className="block text-center border rounded-xl py-2" href={`/messages?listing=${listing.id}`}>Trimite mesaj</a>
          <form action="/api/favorites" method="post" className="mt-2">
            <input type="hidden" name="listingId" value={listing.id} />
            <button className="w-full border rounded-xl py-2" formAction="/api/favorites">Salvează la favorite</button>
          </form>
        </div>
      </aside>
    </div>
  );
}
