import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, Heart, User, Menu, Sparkles } from "lucide-react";
import { useState } from "react";
import { useShop } from "@/state/shop";

export function Header() {
  const [open, setOpen] = useState(false);
  const { bagCount, wishCount, openBag, openWish, openSearch, openMood, toast } = useShop();

  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-4">
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground hover:text-primary transition-colors">
          <Menu className="h-5 w-5" />
        </button>

        <nav className="hidden md:flex items-center gap-1 text-xs font-medium">
          <Link to="/shop" className="px-3 py-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">shop all</Link>
          <Link to="/shop" className="px-3 py-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">new drops 🔥</Link>
          <Link to="/shop" className="px-3 py-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">cute stuff</Link>
          <button onClick={openMood} className="px-3 py-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> mood quiz
          </button>
        </nav>

        <Link to="/" className="font-display text-xl md:text-2xl leading-none text-foreground hover:scale-[1.02] transition-transform">
          oops i <span className="italic text-gradient-vibe">bought</span> it<br className="hidden sm:block" /><span className="text-xs sm:text-sm font-grotesk uppercase tracking-[0.3em] text-muted-foreground"> again 🛍️</span>
        </Link>

        <div className="flex items-center gap-1">
          <button onClick={openSearch} aria-label="Search" className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-center"><Search className="h-4 w-4" /></button>
          <button onClick={() => toast("login coming soon, bestie 💅")} aria-label="Account" className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors hidden sm:flex items-center justify-center"><User className="h-4 w-4" /></button>
          <button onClick={openWish} aria-label="Wishlist" className="relative h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-center">
            <Heart className="h-4 w-4" />
            {wishCount > 0 && <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">{wishCount}</span>}
          </button>
          <button onClick={openBag} aria-label="Bag" className="relative h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-center">
            <ShoppingBag className="h-4 w-4" />
            {bagCount > 0 && <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-gradient-vibe text-[10px] font-bold text-background flex items-center justify-center">{bagCount}</span>}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border/50 px-4 py-3 flex flex-col gap-1 text-sm">
          <Link to="/shop" onClick={() => setOpen(false)} className="px-3 py-2 rounded-full hover:bg-primary/10">shop all</Link>
          <Link to="/shop" onClick={() => setOpen(false)} className="px-3 py-2 rounded-full hover:bg-primary/10">new drops 🔥</Link>
          <Link to="/shop" onClick={() => setOpen(false)} className="px-3 py-2 rounded-full hover:bg-primary/10">cute stuff</Link>
          <button onClick={() => { setOpen(false); openMood(); }} className="text-left px-3 py-2 rounded-full hover:bg-primary/10 inline-flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> mood quiz</button>
        </nav>
      )}
    </header>
  );
}