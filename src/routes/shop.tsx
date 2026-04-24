import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { products, categories } from "@/data/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop the Collection — Maison Noir" },
      { name: "description", content: "Browse leather, watches, outerwear, jewelry, and fragrance from Maison Noir." },
      { property: "og:title", content: "Shop the Collection — Maison Noir" },
      { property: "og:description", content: "Browse leather, watches, outerwear, jewelry, and fragrance from Maison Noir." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sort, setSort] = useState<"featured" | "low" | "high" | "rating">("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let r = products.filter(p =>
      p.price <= maxPrice &&
      (!cat || p.category === cat) &&
      (!query || (p.name + p.tagline + p.category).toLowerCase().includes(query.toLowerCase()))
    );
    if (sort === "low") r = [...r].sort((a, b) => a.price - b.price);
    else if (sort === "high") r = [...r].sort((a, b) => b.price - a.price);
    else if (sort === "rating") r = [...r].sort((a, b) => b.rating - a.rating);
    return r;
  }, [query, cat, maxPrice, sort]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative border-b border-border/40 bg-gradient-surface">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.3em] text-gold mb-4">The Collection</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="font-display text-5xl md:text-7xl">Shop <span className="italic text-gradient-gold">Maison Noir</span></motion.h1>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block lg:w-64 shrink-0 space-y-10`}>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold mb-5">Search</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the maison"
                  className="w-full bg-input/40 border border-border pl-9 pr-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold mb-5">Category</p>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button onClick={() => setCat(null)} className={`block w-full text-left transition-colors ${!cat ? "text-gold" : "text-foreground/70 hover:text-gold"}`}>All Pieces</button>
                </li>
                {categories.map(c => (
                  <li key={c}>
                    <button onClick={() => setCat(c)} className={`block w-full text-left transition-colors ${cat === c ? "text-gold" : "text-foreground/70 hover:text-gold"}`}>{c}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs uppercase tracking-[0.25em] text-gold">Max Price</p>
                <span className="text-sm text-foreground/80">${maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range" min={200} max={5000} step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[var(--gold)]"
              />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-10 gap-4">
              <p className="text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "piece" : "pieces"}</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden inline-flex items-center gap-2 border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] rounded-sm hover:border-gold transition-colors">
                  <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                </button>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="bg-input/40 border border-border px-4 py-2 text-xs uppercase tracking-[0.2em] rounded-sm focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="py-32 text-center">
                <p className="font-display text-3xl">Nothing matches your search.</p>
                <p className="mt-3 text-sm text-muted-foreground">Adjust filters to discover more pieces.</p>
              </div>
            ) : (
              <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}