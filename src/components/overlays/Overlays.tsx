import { AnimatePresence, motion } from "framer-motion";
import { X, Plus, Minus, Trash2, Search, Sparkles, ShoppingBag, Heart, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useShop } from "@/state/shop";
import { products } from "@/data/products";

function Drawer({ open, onClose, side = "right", children, title }: { open: boolean; onClose: () => void; side?: "right" | "left"; children: React.ReactNode; title: string }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            className="fixed inset-0 z-[80] bg-background/70 backdrop-blur-sm" />
          <motion.aside
            initial={{ x: side === "right" ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: side === "right" ? "100%" : "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className={`fixed top-0 ${side}-0 z-[81] h-full w-full sm:w-[440px] bg-surface border-${side === "right" ? "l" : "r"} border-border flex flex-col`}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="font-display text-2xl">{title}</h2>
              <button onClick={onClose} className="h-9 w-9 rounded-full hover:bg-primary/10 flex items-center justify-center transition-colors"><X className="h-4 w-4" /></button>
            </div>
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
            className="fixed inset-0 z-[80] bg-background/80 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 z-[81] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-surface border-2 border-border overflow-hidden shadow-luxe"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function BagDrawer() {
  const { bag, bagOpen, closeBag, setQty, removeFromBag, bagTotal, clearBag, toast } = useShop();
  const [promo, setPromo] = useState("");
  const discount = promo.toUpperCase() === "OOPS10" ? bagTotal * 0.1 : 0;

  return (
    <Drawer open={bagOpen} onClose={closeBag} title="your bag 🛍️">
      {bag.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
          <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="font-display text-2xl">it's giving... empty</p>
          <p className="mt-2 text-sm text-muted-foreground">add something cute to fix that</p>
          <button onClick={closeBag} className="mt-6 px-6 py-3 rounded-full bg-gradient-vibe text-background font-bold text-sm hover:scale-[1.03] transition-transform">browse drops</button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {bag.map((i) => (
              <motion.div layout key={i.product.id} className="flex gap-4 p-3 rounded-2xl bg-surface-elevated border border-border">
                <img src={i.product.image} alt={i.product.name} className="h-24 w-20 object-cover rounded-xl" />
                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg truncate">{i.product.name}</p>
                  <p className="text-xs text-muted-foreground italic truncate">{i.product.tagline}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1 bg-background rounded-full p-1">
                      <button onClick={() => setQty(i.product.id, i.qty - 1)} className="h-7 w-7 rounded-full hover:bg-primary/20 flex items-center justify-center"><Minus className="h-3 w-3" /></button>
                      <span className="w-6 text-center text-sm font-bold">{i.qty}</span>
                      <button onClick={() => setQty(i.product.id, i.qty + 1)} className="h-7 w-7 rounded-full hover:bg-primary/20 flex items-center justify-center"><Plus className="h-3 w-3" /></button>
                    </div>
                    <p className="font-bold">${(i.product.price * i.qty).toFixed(0)}</p>
                  </div>
                </div>
                <button onClick={() => removeFromBag(i.product.id)} className="h-8 w-8 rounded-full hover:bg-destructive/20 hover:text-destructive flex items-center justify-center self-start transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-border p-6 space-y-4 bg-surface-elevated/50">
            <div className="flex gap-2">
              <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="promo code (try OOPS10)" className="flex-1 bg-background border border-border rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors" />
              <button onClick={() => toast(discount > 0 ? "code applied 🎉" : "nope, try OOPS10")} className="px-4 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:scale-105 transition-transform">apply</button>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>subtotal</span><span>${bagTotal.toFixed(0)}</span></div>
              {discount > 0 && <div className="flex justify-between text-primary"><span>discount</span><span>-${discount.toFixed(0)}</span></div>}
              <div className="flex justify-between text-muted-foreground"><span>shipping</span><span>free 💛</span></div>
              <div className="flex justify-between font-display text-2xl pt-2 border-t border-border"><span>total</span><span>${(bagTotal - discount).toFixed(0)}</span></div>
            </div>
            <button onClick={() => { toast("checkout coming soon, save up bestie 💸"); }} className="w-full py-4 rounded-full bg-gradient-vibe text-background font-bold text-sm uppercase tracking-wider hover:scale-[1.02] transition-transform shadow-glow">
              checkout · ${(bagTotal - discount).toFixed(0)}
            </button>
            <button onClick={clearBag} className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors">clear bag</button>
          </div>
        </>
      )}
    </Drawer>
  );
}

function WishDrawer() {
  const { wish, wishOpen, closeWish, toggleWish, addToBag } = useShop();
  const items = wish.map(id => products.find(p => p.id === id)).filter(Boolean) as typeof products;
  return (
    <Drawer open={wishOpen} onClose={closeWish} title="wishlist 💖">
      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
          <Heart className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="font-display text-2xl">nothing saved yet</p>
          <p className="mt-2 text-sm text-muted-foreground">tap the heart on stuff you love</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-6 py-4 grid grid-cols-2 gap-3">
          {items.map(p => (
            <div key={p.id} className="rounded-2xl overflow-hidden bg-surface-elevated border border-border group">
              <img src={p.image} alt={p.name} className="aspect-[4/5] w-full object-cover" />
              <div className="p-3">
                <p className="font-display text-base truncate">{p.name}</p>
                <p className="text-sm font-bold mt-0.5">${p.price}</p>
                <div className="mt-2 flex gap-1">
                  <button onClick={() => addToBag(p)} className="flex-1 py-1.5 rounded-full bg-gradient-vibe text-background text-xs font-bold hover:scale-105 transition-transform">add</button>
                  <button onClick={() => toggleWish(p.id)} aria-label="Remove" className="h-7 w-7 rounded-full bg-background hover:bg-destructive/20 hover:text-destructive flex items-center justify-center transition-colors"><X className="h-3 w-3" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
}

function SearchModal() {
  const { searchOpen, closeSearch, openProduct } = useShop();
  const [q, setQ] = useState("");
  const results = useMemo(() => !q ? products.slice(0, 4) : products.filter(p => (p.name + p.tagline + p.category).toLowerCase().includes(q.toLowerCase())), [q]);
  useEffect(() => { if (!searchOpen) setQ(""); }, [searchOpen]);
  return (
    <Modal open={searchOpen} onClose={closeSearch}>
      <div className="p-6">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="what are we shopping for..." className="flex-1 bg-transparent text-xl font-display focus:outline-none" />
          <button onClick={closeSearch} className="h-8 w-8 rounded-full hover:bg-primary/10 flex items-center justify-center"><X className="h-4 w-4" /></button>
        </div>
        <div className="mt-4 space-y-2 max-h-[60vh] overflow-y-auto">
          {results.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center">no matches. try something else 🤷</p>}
          {results.map(p => (
            <button key={p.id} onClick={() => { closeSearch(); openProduct(p); }} className="w-full flex gap-3 p-2 rounded-xl hover:bg-primary/10 transition-colors text-left">
              <img src={p.image} alt={p.name} className="h-14 w-12 object-cover rounded-lg" />
              <div className="flex-1 min-w-0">
                <p className="font-display text-lg truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground truncate">{p.tagline}</p>
              </div>
              <p className="font-bold self-center">${p.price}</p>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}

function ProductModal() {
  const { productOpen, closeProduct, addToBag, toggleWish, wish } = useShop();
  if (!productOpen) return null;
  const p = productOpen;
  const liked = wish.includes(p.id);
  return (
    <Modal open={!!productOpen} onClose={closeProduct}>
      <div className="grid md:grid-cols-2">
        <img src={p.image} alt={p.name} className="aspect-square md:aspect-auto md:h-full w-full object-cover" />
        <div className="p-6 md:p-8 flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-bold">{p.category}</p>
              <h3 className="mt-2 font-display text-4xl">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground italic">{p.tagline}</p>
            </div>
            <button onClick={closeProduct} className="h-9 w-9 rounded-full hover:bg-primary/10 flex items-center justify-center"><X className="h-4 w-4" /></button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-muted-foreground">{p.rating} · {p.reviews.toLocaleString()} reviews</p>
          </div>
          <p className="mt-6 font-display text-5xl">${p.price}</p>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            an absolute must. ethically sourced, ridiculously cute, and you'll wear it on repeat. ships in 2 days bc we know you can't wait.
          </p>
          <div className="mt-auto pt-6 flex gap-2">
            <button onClick={() => { addToBag(p); closeProduct(); }} className="flex-1 py-4 rounded-full bg-gradient-vibe text-background font-bold uppercase tracking-wider text-sm hover:scale-[1.02] transition-transform shadow-glow">
              add to bag
            </button>
            <button onClick={() => toggleWish(p.id)} aria-label="Wish" className={`h-14 w-14 rounded-full border-2 flex items-center justify-center transition-all ${liked ? "bg-accent border-accent text-accent-foreground" : "border-border hover:border-primary"}`}>
              <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function MoodModal() {
  const { moodOpen, closeMood, openProduct } = useShop();
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState("");
  const [vibe, setVibe] = useState("");
  const [budget, setBudget] = useState(0);
  useEffect(() => { if (!moodOpen) { setStep(0); setMood(""); setVibe(""); setBudget(0); } }, [moodOpen]);

  const recs = useMemo(() => {
    let r = [...products];
    if (budget) r = r.filter(p => p.price <= budget);
    if (vibe === "casual") r = r.sort((a, b) => (a.category === "Footwear" || a.category === "Leather" ? -1 : 1));
    if (vibe === "formal") r = r.sort((a, b) => (a.category === "Watches" || a.category === "Outerwear" ? -1 : 1));
    if (mood === "main character") r = r.filter(p => p.price >= 90);
    return r.slice(0, 3);
  }, [mood, vibe, budget]);

  const moods = ["main character ✨", "soft & cozy 🧸", "feral & flirty 🔥", "delulu 💫"];
  const vibes = [{ k: "casual", l: "casual 👟" }, { k: "formal", l: "formal 🥂" }, { k: "experimental", l: "experimental 🌀" }];
  const budgets = [50, 100, 200, 500];

  return (
    <Modal open={moodOpen} onClose={closeMood}>
      <div className="p-8 md:p-10">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold">
          <Sparkles className="h-3.5 w-3.5" /> mood quiz · step {Math.min(step + 1, 4)}/4
        </div>
        <div className="mt-2 h-1 bg-border rounded-full overflow-hidden">
          <motion.div animate={{ width: `${((step + 1) / 4) * 100}%` }} className="h-full bg-gradient-vibe" />
        </div>

        {step === 0 && (
          <>
            <h3 className="mt-6 font-display text-4xl">what's the mood today?</h3>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {moods.map(m => (
                <button key={m} onClick={() => { setMood(m); setStep(1); }} className="p-5 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/10 text-left font-display text-xl transition-all hover:scale-[1.02]">{m}</button>
              ))}
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <h3 className="mt-6 font-display text-4xl">casual or formal?</h3>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {vibes.map(v => (
                <button key={v.k} onClick={() => { setVibe(v.k); setStep(2); }} className="p-5 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/10 font-display text-lg transition-all hover:scale-[1.02]">{v.l}</button>
              ))}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h3 className="mt-6 font-display text-4xl">what's the budget?</h3>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {budgets.map(b => (
                <button key={b} onClick={() => { setBudget(b); setStep(3); }} className="p-5 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/10 font-display text-2xl transition-all hover:scale-[1.02]">${b}</button>
              ))}
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h3 className="mt-6 font-display text-4xl">your vibes, picked ✨</h3>
            <p className="mt-2 text-sm text-muted-foreground">{mood} · {vibe} · ≤ ${budget}</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {recs.length === 0 && <p className="col-span-3 text-sm text-muted-foreground py-8 text-center">nothing in budget. raise it bestie 💸</p>}
              {recs.map(p => (
                <button key={p.id} onClick={() => { closeMood(); openProduct(p); }} className="text-left rounded-2xl overflow-hidden bg-surface-elevated border border-border hover:border-primary transition-all hover:scale-[1.02]">
                  <img src={p.image} alt={p.name} className="aspect-square w-full object-cover" />
                  <div className="p-3">
                    <p className="font-display text-base truncate">{p.name}</p>
                    <p className="text-sm font-bold">${p.price}</p>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(0)} className="mt-6 text-xs text-muted-foreground hover:text-primary transition-colors">retake quiz →</button>
          </>
        )}
      </div>
    </Modal>
  );
}

function Toaster() {
  const { toasts } = useShop();
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] flex flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="px-5 py-3 rounded-full bg-surface-elevated border-2 border-primary text-sm font-medium shadow-glow"
          >
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function Overlays() {
  return (
    <>
      <BagDrawer />
      <WishDrawer />
      <SearchModal />
      <ProductModal />
      <MoodModal />
      <Toaster />
    </>
  );
}