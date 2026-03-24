"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewTaskPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    subject: '',
    priority: 'medium',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          completed: false, // Default newly created tasks to not completed
        }),
      });

      if (response.ok) {
        // Redirect back to the task list view upon successful creation
        router.push('/tasks');
        router.refresh();
      } else {
        console.error('Failed to create task');
      }
    } catch (error) {
      console.error('An error occurred while creating the task', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 p-6 sm:p-12 font-sans selection:bg-indigo-500/30 relative flex items-center justify-center overflow-hidden">
      
      {/* Background glow effects to match theme */}
      <div className="absolute top-0 left-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px] dark:bg-cyan-500/5"></div>
      <div className="absolute bottom-0 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5"></div>

      <div className="w-full max-w-2xl z-10 relative space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex items-center">
          <Link
            href="/tasks"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white/50 backdrop-blur-sm px-4 py-2 text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          >
            <svg 
              className="w-4 h-4 transition-transform group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Tasks
          </Link>
        </div>

        <div className="rounded-3xl border border-zinc-200/80 bg-white/80 backdrop-blur-md p-8 sm:p-10 shadow-xl shadow-indigo-500/5 dark:border-zinc-800/80 dark:bg-zinc-900/80">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">
              Create New Task
            </h1>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Fill out the details below to add a new assignment to your planner.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Task Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Complete Calculus Homework"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="dueDate" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Due Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  required
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20 [color-scheme:light] dark:[color-scheme:dark]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Subject <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Mathematics"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="priority" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Priority Level
              </label>
              <div className="relative">
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 dark:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin data-[icon='true']:absolute" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Task...
                  </>
                ) : (
                  <>
                    <span>Create Task</span>
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
