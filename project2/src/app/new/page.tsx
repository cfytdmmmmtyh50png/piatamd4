import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function createListing(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "");
  const description = String(formData.get("description") || "");
  const price = Number(formData.get("price") || 0);
  const categoryId = String(formData.get("categoryId") || "");
  const locationId = String(formData.get("locationId") || "");
  // Demo user (replace with auth userId)
  const userId = (await prisma.user.findFirst())?.id || (await prisma.user.create({ data: { email: `demo_${Date.now()}@local.dev` } })).id;
  const listing = await prisma.listing.create({
    data: { title, description, price, categoryId, locationId, userId, currency: "MDL" }
  });
  revalidatePath("/listings");
  return listing.id;
}

export default async function NewListingPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  const locations = await prisma.location.findMany({ orderBy: { region: "asc" } });
  return (
    <form action={createListing} className="max-w-2xl space-y-3">
      <h1 className="text-2xl font-semibold">Creează un anunț</h1>
      <input name="title" placeholder="Titlu" className="border rounded-xl px-3 py-2 w-full" required />
      <textarea name="description" placeholder="Descriere" className="border rounded-xl px-3 py-2 w-full" rows={6} required />
      <input name="price" type="number" placeholder="Preț (MDL)" className="border rounded-xl px-3 py-2 w-full" required />
      <select name="categoryId" className="border rounded-xl px-3 py-2 w-full" required>
        <option value="">Categoria</option>
        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <select name="locationId" className="border rounded-xl px-3 py-2 w-full" required>
        <option value="">Regiune</option>
        {locations.map(l => <option key={l.id} value={l.id}>{l.region}</option>)}
      </select>
      <button className="border rounded-xl px-4 py-2">Publică</button>
    </form>
  );
}
