import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star, Zap, Heart, Flame } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { products, categories } from "@/data/products";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProductCard } from "@/components/product/ProductCard";
import { useShop } from "@/state/shop";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <Header />
      <Hero />
      <Marquee />
      <Featured />
      <Categories />
      <MoodCTA />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}

function Hero() {
  const { openMood, openSearch } = useShop();
  return (
    <section className="relative overflow-hidden">
      {/* blobs */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-blob" />
      <div className="absolute top-32 -right-32 h-96 w-96 rounded-full bg-accent/40 blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyber/30 blur-3xl animate-blob" style={{ animationDelay: "6s", background: "var(--cyber)" }} />

      <div className="relative mx-auto max-w-[1400px] px-4 md:px-10 pt-16 pb-24 md:pt-24 md:pb-32 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <motion.button
            onClick={openMood}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated border-2 border-primary/30 text-xs font-bold uppercase tracking-wider hover:border-primary hover:scale-105 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" /> take the mood quiz <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[clamp(3rem,9vw,7rem)] leading-[0.9]"
          >
            oops i <span className="italic text-gradient-vibe">bought</span><br />
            it <span className="italic text-gradient-vibe">again</span> 🛍️
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 max-w-md text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            the drop you didn't know you needed. vibey fits, cute finds, zero regrets <span className="text-foreground">(mostly).</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link
              to="/shop"
              className="group inline-flex items-center gap-2 bg-gradient-vibe text-background px-7 py-4 text-sm uppercase font-bold tracking-wider rounded-full shadow-glow hover:scale-105 transition-transform"
            >
              shop the drop
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              onClick={openSearch}
              className="inline-flex items-center gap-2 border-2 border-border bg-surface-elevated text-foreground px-7 py-4 text-sm uppercase font-bold tracking-wider rounded-full hover:border-primary hover:bg-primary/10 transition-colors"
            >
              browse vibes
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }}
            className="mt-12 flex flex-wrap gap-6 text-xs text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-primary" /> 2-day shipping</span>
            <span className="inline-flex items-center gap-1.5"><Heart className="h-3.5 w-3.5 text-accent" /> 50k+ besties</span>
            <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-primary" /> 4.9 avg rating</span>
          </motion.div>
        </div>

        {/* Hero image card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border-4 border-foreground shadow-pop bg-surface-elevated">
            <img src={heroImg} alt="" width={1920} height={1080} className="h-full w-full object-cover" />
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest">live drop</div>
          </div>
          {/* sticker */}
          <motion.div
            animate={{ rotate: [-8, -4, -8] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-display text-center leading-tight text-lg shadow-pop-pink border-4 border-foreground"
          >
            new<br />new<br />new ✦
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-cyber text-background font-bold text-sm shadow-pop border-2 border-foreground" style={{ background: "var(--cyber)" }}
          >
            slay 💅
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["free shipping over $50 🚚", "no thoughts just shopping 💸", "2-day delivery 💨", "30-day returns 🔁", "treat yourself 💖", "your villain era starts here 🖤"];
  return (
    <div className="border-y-2 border-foreground py-4 overflow-hidden bg-gradient-vibe text-background">
      <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap text-sm font-bold uppercase tracking-wider">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-12">{t}<span>✦</span></span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

function Featured() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 md:px-10 py-20 md:py-32">
      <div className="flex items-end justify-between mb-12 gap-8 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3 inline-flex items-center gap-1.5"><Flame className="h-3.5 w-3.5" /> trending rn</p>
          <h2 className="font-display text-5xl md:text-7xl">stuff you'll <span className="italic text-gradient-vibe">obsess</span> over</h2>
        </div>
        <Link to="/shop" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-border hover:border-primary hover:bg-primary/10 text-sm font-bold transition-colors">
          see everything <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 6).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="bg-gradient-surface py-20 md:py-32 noise">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">shop by vibe</p>
          <h2 className="font-display text-5xl md:text-7xl">pick your <span className="italic text-gradient-vibe">era</span></h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
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
                <Link to="/shop" className="group block relative aspect-[3/4] overflow-hidden rounded-[2rem] border-2 border-border hover:border-primary transition-all hover-lift">
                  <img src={product.image} alt={c} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <p className="text-xs uppercase tracking-widest text-primary font-bold mb-2">era {i + 1}</p>
                    <h3 className="font-display text-4xl md:text-5xl">{c.toLowerCase()}</h3>
                    <span className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold group-hover:text-primary transition-colors">
                      shop now <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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

function MoodCTA() {
  const { openMood } = useShop();
  return (
    <section className="mx-auto max-w-[1400px] px-4 md:px-10 py-20 md:py-32">
      <div className="relative overflow-hidden rounded-[2rem] border-2 border-foreground bg-gradient-vibe p-10 md:p-16 text-background grain">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-background/10 animate-spin-slow" />
        <div className="relative grid md:grid-cols-[1fr_auto] items-center gap-8">
          <div>
            <p className="text-xs uppercase tracking-widest font-bold mb-3 inline-flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> world first</p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">don't know what<br /><span className="italic">to buy?</span> 🤷</h2>
            <p className="mt-5 text-base md:text-lg max-w-xl opacity-90">tell us your mood, vibe, and budget — we'll find your next obsession in 30 seconds.</p>
          </div>
          <button onClick={openMood} className="self-end md:self-center group inline-flex items-center gap-3 bg-foreground text-background px-8 py-5 text-sm uppercase font-bold tracking-wider rounded-full hover:scale-105 transition-transform shadow-luxe">
            take the quiz <Sparkles className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { q: "i wasn't supposed to buy anything this month. oops.", a: "@maddie.exe", h: "5 items deep" },
    { q: "the mood quiz read me for FILTH. i bought everything.", a: "@vibesonly_22", h: "loyal bestie" },
    { q: "shipping was so fast i forgot i ordered. main character moment.", a: "@itsjustkay", h: "verified slay" },
  ];
  return (
    <section className="mx-auto max-w-[1400px] px-4 md:px-10 py-20 md:py-32">
      <div className="text-center mb-14">
        <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">the besties said</p>
        <h2 className="font-display text-5xl md:text-7xl">no notes, just <span className="italic text-gradient-vibe">love</span> 💌</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {quotes.map((t, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className={`p-8 rounded-3xl border-2 border-border hover:border-primary transition-all hover-lift ${i === 1 ? "bg-gradient-vibe text-background border-foreground" : "bg-surface-elevated"}`}
          >
            <div className={`flex gap-0.5 mb-4 ${i === 1 ? "" : "text-primary"}`}>
              {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
            </div>
            <blockquote className="font-display text-2xl leading-snug">"{t.q}"</blockquote>
            <figcaption className={`mt-6 text-xs uppercase tracking-wider font-bold flex items-center justify-between ${i === 1 ? "" : "text-muted-foreground"}`}>
              <span>{t.a}</span><span className="opacity-60">{t.h}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const { toast } = useShop();
  return (
    <section className="mx-auto max-w-3xl px-4 md:px-10 py-20 md:py-32 text-center">
      <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">join the chaos</p>
      <h2 className="font-display text-5xl md:text-7xl">drop alerts in your <span className="italic text-gradient-vibe">dms</span></h2>
      <p className="mt-5 text-base text-muted-foreground max-w-md mx-auto">first dibs on new drops, secret promos, and unhinged commentary. 2x a week, no spam.</p>
      <form onSubmit={(e) => { e.preventDefault(); toast("ur in 💌"); }} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email" required
          placeholder="your@email.com"
          className="flex-1 bg-surface-elevated border-2 border-border px-5 py-4 text-sm rounded-full focus:outline-none focus:border-primary transition-colors"
        />
        <button className="bg-gradient-vibe text-background px-8 py-4 text-sm uppercase tracking-wider font-bold rounded-full hover:scale-105 transition-transform shadow-glow">
          sign me up
        </button>
      </form>
    </section>
  );
}