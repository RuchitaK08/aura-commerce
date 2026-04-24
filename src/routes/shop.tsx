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

      <section className="relative border-b-2 border-border bg-gradient-surface overflow-hidden">
        <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-blob" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
        <div className="relative mx-auto max-w-[1400px] px-4 md:px-10 py-16 md:py-24 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-widest text-primary font-bold mb-3">all the drops</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="font-display text-6xl md:text-8xl">shop the <span className="italic text-gradient-vibe">vibe</span> 🛍️</motion.h1>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block lg:w-64 shrink-0 space-y-8`}>
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">search</p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="search vibes..."
                  className="w-full bg-surface-elevated border-2 border-border pl-9 pr-3 py-2.5 text-sm rounded-full focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">category</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setCat(null)} className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${!cat ? "bg-gradient-vibe text-background border-foreground" : "border-border hover:border-primary"}`}>all</button>
                {categories.map(c => (
                  <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${cat === c ? "bg-gradient-vibe text-background border-foreground" : "border-border hover:border-primary"}`}>{c.toLowerCase()}</button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs uppercase tracking-widest text-primary font-bold">max price</p>
                <span className="text-sm font-bold">${maxPrice}</span>
              </div>
              <input
                type="range" min={20} max={500} step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
            </div>
            <button onClick={() => { setQuery(""); setCat(null); setMaxPrice(500); setSort("featured"); }} className="text-xs text-muted-foreground hover:text-primary transition-colors">reset filters</button>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-8 gap-4">
              <p className="text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "find" : "finds"} 🔥</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden inline-flex items-center gap-2 border-2 border-border px-4 py-2 text-xs font-bold rounded-full hover:border-primary transition-colors">
                  <SlidersHorizontal className="h-3.5 w-3.5" /> filters
                </button>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="bg-surface-elevated border-2 border-border px-4 py-2 text-xs font-bold rounded-full focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="featured">sort: featured</option>
                  <option value="low">price: low → high</option>
                  <option value="high">price: high → low</option>
                  <option value="rating">top rated</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="py-32 text-center">
                <p className="font-display text-4xl">nothing here bestie 🤷</p>
                <p className="mt-3 text-sm text-muted-foreground">try resetting the filters</p>
              </div>
            ) : (
              <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
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