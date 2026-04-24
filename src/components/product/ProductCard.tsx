import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import type { Product } from "@/data/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-surface">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {product.isNew && (
          <span className="absolute top-4 left-4 text-[10px] tracking-[0.25em] uppercase text-gold bg-background/60 backdrop-blur px-3 py-1 rounded-sm">
            New
          </span>
        )}

        <button
          aria-label="Wishlist"
          className="absolute top-4 right-4 h-9 w-9 rounded-full glass flex items-center justify-center text-foreground/80 hover:text-gold transition-all hover:scale-110"
        >
          <Heart className="h-3.5 w-3.5" />
        </button>

        <button
          className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-center justify-center gap-2 bg-gradient-gold text-gold-foreground py-3 text-xs uppercase tracking-[0.2em] font-medium rounded-sm shadow-glow"
        >
          <Plus className="h-3.5 w-3.5" /> Add to Bag
        </button>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-gold/80">{product.category}</p>
          <h3 className="mt-1.5 font-display text-xl text-foreground">{product.name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground italic">{product.tagline}</p>
        </div>
        <p className="font-display text-lg text-foreground whitespace-nowrap">${product.price.toLocaleString()}</p>
      </div>
    </motion.article>
  );
}