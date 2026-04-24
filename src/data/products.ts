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
  { id: "oops-tote-01", name: "It Bag, Literally", tagline: "the only bag your fits need rn ✨", price: 128, category: "Leather", image: p1, rating: 4.9, reviews: 2143, isNew: true },
  { id: "oops-watch-01", name: "Time Flex", tagline: "wrist game on max 💛", price: 285, category: "Watches", image: p2, rating: 4.8, reviews: 967 },
  { id: "oops-coat-01", name: "Main Character Coat", tagline: "for your villain era 🖤", price: 198, category: "Outerwear", image: p3, rating: 4.9, reviews: 1422 },
  { id: "oops-sneaker-01", name: "No Thoughts Sneaks", tagline: "goes w/ literally everything", price: 92, category: "Footwear", image: p4, rating: 4.7, reviews: 3187, isNew: true },
  { id: "oops-pendant-01", name: "Tiny Tear Pendant", tagline: "delulu but make it gold ✨", price: 49, category: "Jewelry", image: p5, rating: 5.0, reviews: 678 },
  { id: "oops-parfum-01", name: "Hot Take EDP", tagline: "smells like a soft launch 🔥", price: 64, category: "Fragrance", image: p6, rating: 4.8, reviews: 5024 },
];

export const categories = ["Leather", "Watches", "Outerwear", "Footwear", "Jewelry", "Fragrance"] as const;