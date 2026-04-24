import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/products";

type BagItem = { product: Product; qty: number };
type ToastT = { id: number; msg: string };

type Ctx = {
  bag: BagItem[];
  wish: string[];
  bagCount: number;
  wishCount: number;
  bagTotal: number;
  addToBag: (p: Product) => void;
  removeFromBag: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  toggleWish: (id: string) => void;
  clearBag: () => void;

  bagOpen: boolean; openBag: () => void; closeBag: () => void;
  wishOpen: boolean; openWish: () => void; closeWish: () => void;
  searchOpen: boolean; openSearch: () => void; closeSearch: () => void;
  moodOpen: boolean; openMood: () => void; closeMood: () => void;
  productOpen: Product | null; openProduct: (p: Product) => void; closeProduct: () => void;

  toast: (msg: string) => void;
  toasts: ToastT[];
};

const ShopCtx = createContext<Ctx | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<BagItem[]>([]);
  const [wish, setWish] = useState<string[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [wishOpen, setWishOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moodOpen, setMoodOpen] = useState(false);
  const [productOpen, setProductOpen] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastT[]>([]);

  // hydrate from localStorage on client only
  useEffect(() => {
    try {
      const b = localStorage.getItem("oops_bag");
      const w = localStorage.getItem("oops_wish");
      if (b) {
        const ids = JSON.parse(b) as { id: string; qty: number }[];
        setBag(ids.map(({ id, qty }) => ({ product: products.find(p => p.id === id)!, qty })).filter(i => i.product));
      }
      if (w) setWish(JSON.parse(w));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("oops_bag", JSON.stringify(bag.map(i => ({ id: i.product.id, qty: i.qty })))); } catch {}
  }, [bag]);
  useEffect(() => {
    try { localStorage.setItem("oops_wish", JSON.stringify(wish)); } catch {}
  }, [wish]);

  const toast = useCallback((msg: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter(x => x.id !== id)), 2600);
  }, []);

  const addToBag = useCallback((p: Product) => {
    setBag((b) => {
      const existing = b.find(i => i.product.id === p.id);
      if (existing) return b.map(i => i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...b, { product: p, qty: 1 }];
    });
    toast(`✨ ${p.name} added — no thoughts, just vibes`);
  }, [toast]);

  const removeFromBag = useCallback((id: string) => {
    setBag((b) => b.filter(i => i.product.id !== id));
    toast("removed. it's giving restraint 💅");
  }, [toast]);

  const setQty = useCallback((id: string, qty: number) => {
    setBag((b) => qty <= 0 ? b.filter(i => i.product.id !== id) : b.map(i => i.product.id === id ? { ...i, qty } : i));
  }, []);

  const toggleWish = useCallback((id: string) => {
    setWish((w) => {
      if (w.includes(id)) { toast("unwished. growth 🌱"); return w.filter(x => x !== id); }
      toast("saved to wishlist 💖");
      return [...w, id];
    });
  }, [toast]);

  const clearBag = useCallback(() => setBag([]), []);

  const value = useMemo<Ctx>(() => ({
    bag, wish,
    bagCount: bag.reduce((s, i) => s + i.qty, 0),
    wishCount: wish.length,
    bagTotal: bag.reduce((s, i) => s + i.qty * i.product.price, 0),
    addToBag, removeFromBag, setQty, toggleWish, clearBag,
    bagOpen, openBag: () => setBagOpen(true), closeBag: () => setBagOpen(false),
    wishOpen, openWish: () => setWishOpen(true), closeWish: () => setWishOpen(false),
    searchOpen, openSearch: () => setSearchOpen(true), closeSearch: () => setSearchOpen(false),
    moodOpen, openMood: () => setMoodOpen(true), closeMood: () => setMoodOpen(false),
    productOpen, openProduct: (p) => setProductOpen(p), closeProduct: () => setProductOpen(null),
    toast, toasts,
  }), [bag, wish, bagOpen, wishOpen, searchOpen, moodOpen, productOpen, toasts, addToBag, removeFromBag, setQty, toggleWish, clearBag, toast]);

  return <ShopCtx.Provider value={value}>{children}</ShopCtx.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopCtx);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}