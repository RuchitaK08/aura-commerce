import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { products, categories } from "@/data/products";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/product/ProductCard";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <Marquee />
      <Featured />
      <Categories />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={heroImg} alt="" width={1920} height={1080} className="h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 pt-24 pb-32 md:pt-40 md:pb-48 min-h-[88vh] flex items-center">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.4em] text-gold mb-6"
          >
            Autumn Collection · MMXXVI
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foreground"
          >
            Quiet luxury,<br /><span className="text-gradient-gold italic">defined.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 max-w-md text-base text-muted-foreground leading-relaxed"
          >
            Editorial pieces in leather, gold, and cashmere — crafted in our ateliers and built to outlast the season.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 bg-gradient-gold text-gold-foreground px-8 py-4 text-xs uppercase tracking-[0.25em] font-medium rounded-sm shadow-glow hover:shadow-luxe transition-all duration-500"
            >
              Discover Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 border border-gold/40 text-foreground px-8 py-4 text-xs uppercase tracking-[0.25em] font-medium rounded-sm hover:bg-gold/10 hover:border-gold transition-all duration-500"
            >
              The Maison
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Hand-crafted in Florence", "Carbon-neutral shipping", "Lifetime restoration", "Private appointments", "Atelier guarantee"];
  return (
    <div className="border-y border-border/40 py-5 overflow-hidden bg-surface/50">
      <div className="flex gap-16 animate-[marquee_40s_linear_infinite] whitespace-nowrap text-xs uppercase tracking-[0.3em] text-foreground/60">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-16">{t}<span className="text-gold">✦</span></span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function Featured() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-28 md:py-40">
      <div className="flex items-end justify-between mb-16 gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Editor's Selection</p>
          <h2 className="font-display text-4xl md:text-6xl">The season's <span className="italic text-gradient-gold">essentials</span></h2>
        </div>
        <Link to="/shop" className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground/70 hover:text-gold transition-colors">
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 6).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="bg-gradient-surface py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Explore</p>
          <h2 className="font-display text-4xl md:text-6xl">Trending <span className="italic text-gradient-gold">categories</span></h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.slice(0, 3).map((c, i) => {
            const product = products.find(p => p.category === c)!;
            return (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to="/shop" className="group block relative aspect-[3/4] overflow-hidden rounded-sm hover-lift">
                  <img src={product.image} alt={c} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-xs uppercase tracking-[0.3em] text-gold mb-2">Collection</p>
                    <h3 className="font-display text-3xl md:text-4xl text-foreground">{c}</h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-foreground/80 group-hover:text-gold transition-colors">
                      Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { q: "An atelier that understands restraint. Every piece feels like an heirloom.", a: "Vogue France" },
    { q: "Maison Noir has redefined what quiet luxury truly means in the modern era.", a: "Monocle" },
    { q: "Impeccable craft. The leather alone is worth the pilgrimage.", a: "The Financial Times" },
  ];
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-28 md:py-40">
      <div className="text-center mb-20">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Press</p>
        <h2 className="font-display text-4xl md:text-6xl">In their <span className="italic text-gradient-gold">words</span></h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {quotes.map((t, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="glass rounded-sm p-10 hover-lift"
          >
            <div className="flex gap-1 text-gold mb-6">
              {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-current" />)}
            </div>
            <blockquote className="font-display text-xl leading-relaxed text-foreground italic">"{t.q}"</blockquote>
            <figcaption className="mt-8 text-xs uppercase tracking-[0.25em] text-gold">— {t.a}</figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="mx-auto max-w-4xl px-6 md:px-10 py-28 md:py-40 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-gold mb-4">The Atelier Letter</p>
      <h2 className="font-display text-4xl md:text-6xl">Private <span className="italic text-gradient-gold">previews</span>.</h2>
      <p className="mt-6 text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
        Receive first access to seasonal collections, atelier stories, and invitation-only releases.
      </p>
      <form className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="your@email.com"
          className="flex-1 bg-input/40 border border-border px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground/60 rounded-sm focus:outline-none focus:border-gold transition-colors"
        />
        <button className="bg-gradient-gold text-gold-foreground px-8 py-4 text-xs uppercase tracking-[0.25em] font-medium rounded-sm hover:shadow-glow transition-all">
          Subscribe
        </button>
      </form>
    </section>
  );
}
