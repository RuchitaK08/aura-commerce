import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { ShopProvider } from "@/state/shop";
import { Overlays } from "@/components/overlays/Overlays";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-gradient-vibe">404</h1>
        <h2 className="mt-4 font-display text-3xl text-foreground">oops, this page is missing 🫠</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          maybe it ghosted us. let's get you back home.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-vibe px-6 py-3 text-sm font-bold text-background uppercase tracking-wider hover:scale-105 transition-transform shadow-glow"
          >
            take me home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Oops I Bought It Again 🛍️ — your new fav obsession" },
      { name: "description", content: "The drop you didn't know you needed. Vibey fits, cute finds, zero regrets (mostly)." },
      { name: "author", content: "Oops I Bought It Again" },
      { property: "og:title", content: "Oops I Bought It Again 🛍️" },
      { property: "og:description", content: "The drop you didn't know you needed. Vibey fits, cute finds, zero regrets (mostly)." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ShopProvider>
      <Outlet />
      <Overlays />
    </ShopProvider>
  );
}
