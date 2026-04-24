import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, Heart, User, Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground/80 hover:text-gold transition-colors">
          <Menu className="h-5 w-5" />
        </button>
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-foreground/70">
          <Link to="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <Link to="/shop" search={{ category: "Leather" } as never} className="hover:text-gold transition-colors">Leather</Link>
          <Link to="/shop" search={{ category: "Watches" } as never} className="hover:text-gold transition-colors">Watches</Link>
          <Link to="/shop" search={{ category: "Jewelry" } as never} className="hover:text-gold transition-colors">Jewelry</Link>
        </nav>
        <Link to="/" className="font-display text-2xl tracking-[0.3em] text-foreground hover:text-gold transition-colors">
          MAISON<span className="text-gradient-gold"> NOIR</span>
        </Link>
        <div className="flex items-center gap-5 text-foreground/70">
          <button aria-label="Search" className="hover:text-gold transition-colors hidden sm:inline-flex"><Search className="h-4 w-4" /></button>
          <button aria-label="Account" className="hover:text-gold transition-colors hidden sm:inline-flex"><User className="h-4 w-4" /></button>
          <button aria-label="Wishlist" className="hover:text-gold transition-colors"><Heart className="h-4 w-4" /></button>
          <button aria-label="Bag" className="relative hover:text-gold transition-colors">
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-gradient-gold text-[10px] font-medium text-gold-foreground flex items-center justify-center">2</span>
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden border-t border-border/50 px-6 py-4 flex flex-col gap-3 text-xs uppercase tracking-[0.2em] text-foreground/70">
          <Link to="/shop">Shop All</Link>
          <Link to="/shop">Leather</Link>
          <Link to="/shop">Watches</Link>
          <Link to="/shop">Jewelry</Link>
        </nav>
      )}
    </header>
  );
}