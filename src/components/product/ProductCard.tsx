import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useShop } from "@/state/shop";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToBag, toggleWish, wish, openProduct } = useShop();
  const liked = wish.includes(product.id);
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <button onClick={() => openProduct(product)} className="block w-full text-left">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface border-2 border-border group-hover:border-primary/40 transition-colors">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {product.isNew && (
          <span className="absolute top-4 left-4 text-[10px] tracking-widest uppercase text-background bg-gradient-vibe px-3 py-1.5 rounded-full font-bold">
            ✦ new drop
          </span>
        )}

        <span
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWish(product.id); }}
          aria-label="Wishlist"
          role="button"
          className={`absolute top-4 right-4 h-10 w-10 rounded-full glass flex items-center justify-center transition-all hover:scale-110 cursor-pointer ${liked ? "text-accent" : "text-foreground/80 hover:text-accent"}`}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
        </span>

        <span
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToBag(product); }}
          role="button"
          className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-center justify-center gap-2 bg-gradient-vibe text-background py-3 text-xs uppercase tracking-wider font-bold rounded-full shadow-glow cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" /> add to bag
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-widest uppercase text-primary font-bold">{product.category}</p>
          <h3 className="mt-1.5 font-display text-2xl text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground italic">{product.tagline}</p>
        </div>
        <p className="font-display text-2xl text-foreground whitespace-nowrap">${product.price}</p>
      </div>
      </button>
    </motion.article>
  );
}