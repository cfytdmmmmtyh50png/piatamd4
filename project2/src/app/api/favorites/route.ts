import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const listingId = String(form.get("listingId"));
  // Demo user
  const user = await prisma.user.findFirst();
  if (!user) return NextResponse.json({ error: "no user" }, { status: 401 });
  await prisma.favorite.upsert({
    where: { userId_listingId: { userId: user.id, listingId } },
    create: { userId: user.id, listingId },
    update: {}
  });
  return NextResponse.redirect(new URL(`/listings/${listingId}`, req.url));
}
