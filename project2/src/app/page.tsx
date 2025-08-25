import Link from "next/link";

export default async function HomePage() {
  const blocks = [
    { href: "/listings?cat=auto", title: "Auto" },
    { href: "/listings?cat=imobiliare", title: "Imobiliare" },
    { href: "/listings?cat=electronice", title: "Electronice" },
    { href: "/listings?cat=joburi", title: "Locuri de muncă" },
    { href: "/listings?cat=servicii", title: "Servicii" },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Bine ai venit pe Piata.md</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {blocks.map(b => (
          <Link key={b.href} href={b.href} className="rounded-2xl border p-6 hover:shadow">
            <div className="text-lg font-medium">{b.title}</div>
            <div className="text-sm text-gray-500">Vezi anunțurile</div>
          </Link>
        ))}
      </div>
      <div className="rounded-2xl border p-6">
        <h2 className="text-xl font-semibold mb-2">Publică anunț</h2>
        <p className="text-gray-600 mb-3">Vinde rapid în toată Moldova. Adaugă poze, preț, locație și contacte.</p>
        <Link href="/new" className="inline-block border rounded-xl px-4 py-2">Creează anunț</Link>
      </div>
    </div>
  );
}
