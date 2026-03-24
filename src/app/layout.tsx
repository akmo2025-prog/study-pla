import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Study Planner",
  description: "Organize your academic life seamlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/" className="flex items-center gap-2 group">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-500/20 group-hover:bg-indigo-500 transition-colors">
                    S
                  </span>
                  <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    Study Planner
                  </span>
                </Link>
                <div className="hidden sm:flex items-center gap-6 text-sm font-medium">
                  <Link href="/" className="text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">
                    Home
                  </Link>
                  <Link href="/tasks" className="text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">
                    Tasks
                  </Link>
                  <Link href="/tasks/new" className="text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400">
                    New Task
                  </Link>
                </div>
              </div>
              <div className="flex sm:hidden">
                <Link href="/tasks/new" className="inline-flex items-center justify-center rounded-full bg-indigo-600/10 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-600/20 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20 transition-colors">
                  + New
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative">
          {children}
        </main>
      </body>
    </html>
  );
}
