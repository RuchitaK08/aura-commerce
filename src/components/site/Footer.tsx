import { useShop } from "@/state/shop";
import { Link } from "@tanstack/react-router";

export function Footer() {
  const { toast, openMood } = useShop();
  return (
    <footer className="mt-20 border-t-2 border-border bg-gradient-surface">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="font-display text-3xl">oops i <span className="italic text-gradient-vibe">bought</span> it again 🛍️</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm">
              your favorite shopping mistake since 2024. cute stuff, fast shipping, no judgment.
            </p>
            <div className="mt-5 flex gap-2">
              {["instagram", "tiktok", "pinterest"].map(s => (
                <button key={s} onClick={() => toast(`follow us on ${s} 💖`)} className="px-4 py-2 rounded-full border-2 border-border text-xs font-bold hover:border-primary hover:bg-primary/10 transition-colors">{s}</button>
              ))}
            </div>
          </div>
          {[
            { t: "shop", l: [["all drops", "/shop"], ["new in", "/shop"], ["bestsellers", "/shop"], ["sale", "/shop"]] as [string, string][] },
            { t: "the deal", l: [["mood quiz", "mood"], ["shipping", "toast"], ["returns", "toast"], ["faq", "toast"]] as [string, string][] },
          ].map((c) => (
            <div key={c.t}>
              <p className="text-xs uppercase tracking-widest text-primary font-bold mb-4">{c.t}</p>
              <ul className="space-y-2.5 text-sm">
                {c.l.map(([label, target]) => (
                  <li key={label}>
                    {target === "mood" ? (
                      <button onClick={openMood} className="hover:text-primary transition-colors">{label}</button>
                    ) : target === "toast" ? (
                      <button onClick={() => toast(`${label} info coming soon 💌`)} className="hover:text-primary transition-colors">{label}</button>
                    ) : (
                      <Link to={target} className="hover:text-primary transition-colors">{label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} oops i bought it again. delulu is the solulu.</p>
          <p>made with 💖 + caffeine</p>
        </div>
      </div>
    </footer>
  );
}