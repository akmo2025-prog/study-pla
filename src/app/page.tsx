import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-indigo-500/30 overflow-hidden relative">
      <main className="relative flex w-full max-w-5xl flex-col items-center justify-center p-6 sm:p-12 text-center z-10">
        
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-[120px] dark:bg-indigo-500/20"></div>
        <div className="absolute top-0 right-1/4 -z-10 h-[250px] w-[250px] rounded-full bg-cyan-500/20 blur-[100px] dark:bg-cyan-500/10"></div>

        {/* Content */}
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:text-indigo-300 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
            Your Personal Study Assistant
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">
              Study Planner
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl leading-relaxed">
            Stay organized and ahead of your classes. Effortlessly track your assignments, manage deadlines, and take control of your academic life all in one beautiful workspace.
          </p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-150">
          <Link
            href="/tasks"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95"
          >
            <span>Go to Tasks</span>
            <svg
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          
          <button
            className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white/50 backdrop-blur-sm px-8 py-4 text-base font-medium text-zinc-900 transition-all hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:border-zinc-700 active:scale-95"
          >
            Learn more
          </button>
        </div>
      </main>
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
    </div>
  );
}
