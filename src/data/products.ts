import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  category: "Leather" | "Watches" | "Outerwear" | "Footwear" | "Jewelry" | "Fragrance";
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
};

export const products: Product[] = [
  { id: "noir-tote-01", name: "Atelier Tote", tagline: "Hand-stitched calfskin", price: 1280, category: "Leather", image: p1, rating: 4.9, reviews: 214, isNew: true },
  { id: "noir-watch-01", name: "Solène Automatic", tagline: "18k gold case, sapphire crystal", price: 4850, category: "Watches", image: p2, rating: 4.8, reviews: 96 },
  { id: "noir-coat-01", name: "Maître Overcoat", tagline: "Italian wool, double-breasted", price: 1980, category: "Outerwear", image: p3, rating: 4.9, reviews: 142 },
  { id: "noir-sneaker-01", name: "Onyx Low", tagline: "Full-grain leather, blake-stitched", price: 620, category: "Footwear", image: p4, rating: 4.7, reviews: 318, isNew: true },
  { id: "noir-pendant-01", name: "Larme d'Or", tagline: "Solid 18k gold pendant", price: 990, category: "Jewelry", image: p5, rating: 5.0, reviews: 67 },
  { id: "noir-parfum-01", name: "Ambre Noir", tagline: "Eau de Parfum · 100ml", price: 240, category: "Fragrance", image: p6, rating: 4.8, reviews: 502 },
];

export const categories = ["Leather", "Watches", "Outerwear", "Footwear", "Jewelry", "Fragrance"] as const;