export default function MessagesPage({ searchParams }: { searchParams: Record<string,string|undefined> }) {
  const listing = searchParams.listing;
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Mesaje (MVP)</h1>
      <p>Chatul va fi implementat aici. Trimite mesaje vânzătorilor, vezi conversațiile, marchează ca citit.</p>
      {listing && <div className="text-sm">Inițiază conversație pentru anunț: {listing}</div>}
    </div>
  );
}
