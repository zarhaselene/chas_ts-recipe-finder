import SearchClient from "@/components/SearchClient";

export default function Home() {
  return (
    <div className="min-h-screen p-8 grid place-items-start">
      <main className="max-w-3xl w-full">
        <h1 className="text-2xl font-semibold mb-4">Recipe Finder</h1>
        <SearchClient />
      </main>
    </div>
  );
}
