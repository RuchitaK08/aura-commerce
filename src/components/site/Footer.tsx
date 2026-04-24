export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/40 bg-gradient-surface">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h3 className="font-display text-2xl tracking-[0.2em]">MAISON<span className="text-gradient-gold"> NOIR</span></h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              An atelier of quiet luxury. Crafted in Paris, Florence, and Kyoto since 1962.
            </p>
          </div>
          {[
            { t: "Maison", l: ["Our Story", "Craftsmanship", "Sustainability", "Press"] },
            { t: "Client Care", l: ["Contact", "Shipping & Returns", "Care Guide", "Size Guide"] },
            { t: "Discover", l: ["Journal", "Private Appointments", "Gift Cards", "Boutiques"] },
          ].map((c) => (
            <div key={c.t}>
              <p className="text-xs uppercase tracking-[0.25em] text-gold mb-5">{c.t}</p>
              <ul className="space-y-3 text-sm text-foreground/70">
                {c.l.map((i) => <li key={i}><a href="#" className="hover:text-gold transition-colors">{i}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="gold-divider mt-16" />
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground tracking-wider">
          <p>© {new Date().getFullYear()} Maison Noir. All rights reserved.</p>
          <p className="uppercase tracking-[0.2em]">Paris · Milano · Tokyo · New York</p>
        </div>
      </div>
    </footer>
  );
}