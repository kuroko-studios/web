import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kuroko — Give AI a job, not a question.",
  description:
    "Kuroko builds the quiet AI system that does the work for your business: one brain, your tools connected, jobs handed over and handed back done.",
};

const CHECK_URL = "https://kuroko-hq.vercel.app/check"; // moves to /check here once migrated

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-line/60 bg-surface-page/80 backdrop-blur-md">
      <div className="max-w-[1100px] mx-auto px-5 h-16 flex items-center gap-8">
        <Link href="/" className="font-bold tracking-tight text-lg text-text-primary">
          KUROKO<span className="text-accent-text">.</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-text-secondary">
          <Link href="/#how" className="hover:text-text-primary transition-colors">How it works</Link>
          <Link href="/#start" className="hover:text-text-primary transition-colors">How you start</Link>
          <Link href="/#name" className="hover:text-text-primary transition-colors">About</Link>
        </nav>
        <a href={CHECK_URL} className="krk-btn krk-btn--primary krk-btn--sm ml-auto">
          Take the readiness check
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-[1100px] mx-auto px-5 py-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-sm text-text-muted">
        <span>
          KUROKO<span className="text-accent-text">.</span> — give AI a job, not a question.
        </span>
        <nav className="flex gap-5">
          <Link href="/#how" className="hover:text-text-primary transition-colors">How it works</Link>
          <a href={CHECK_URL} className="hover:text-text-primary transition-colors">Readiness check</a>
        </nav>
        <span>© Kuroko {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="antialiased">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
