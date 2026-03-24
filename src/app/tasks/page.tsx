"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Type definitions
type Task = {
  id: number;
  title: string;
  dueDate: string;
  subject: string;
  priority: string;
  completed: boolean;
};

// Helper to handle priority styling
function getPriorityStyles(priority: string) {
  switch (priority) {
    case 'high':
      return 'text-rose-700 bg-rose-100 dark:bg-rose-500/20 dark:text-rose-400 border-rose-200 dark:border-rose-500/30';
    case 'medium':
      return 'text-amber-700 bg-amber-100 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30';
    case 'low':
      return 'text-sky-700 bg-sky-100 dark:bg-sky-500/20 dark:text-sky-400 border-sky-200 dark:border-sky-500/30';
    default:
      return 'text-zinc-700 bg-zinc-100 dark:bg-zinc-500/20 dark:text-zinc-400 border-zinc-200 dark:border-zinc-500/30';
  }
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 p-6 sm:p-12 font-sans selection:bg-indigo-500/30 relative overflow-hidden">
      
      {/* Background glow effects matching homepage */}
      <div className="absolute top-0 right-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px] dark:bg-cyan-500/5"></div>
      <div className="absolute top-1/2 left-0 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5"></div>

      <div className="max-w-6xl mx-auto space-y-10 z-10 relative">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">
              My Tasks
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Manage your upcoming assignments and track your progress.
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Link
              href="/tasks/new"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-500 hover:shadow-md hover:shadow-indigo-500/25 active:scale-95 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              New Task
            </Link>
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white/50 backdrop-blur-sm px-5 py-2.5 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Back
            </Link>
          </div>
        </div>

        {/* Dynamic State Layout (Loading / Empty / Content) */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
            <div className="relative flex h-16 w-16">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-20"></span>
              <span className="relative inline-flex rounded-full h-16 w-16 bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30 items-center justify-center">
                <svg className="w-8 h-8 text-indigo-500 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            </div>
            <p className="mt-4 text-zinc-500 dark:text-zinc-400 font-medium animate-pulse">Fetching your tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">No tasks found. You're all caught up!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 ${task.completed
                    ? 'border-emerald-500/20 bg-emerald-50/30 backdrop-blur-sm dark:border-emerald-500/10 dark:bg-emerald-500/5'
                    : 'border-zinc-200/80 bg-white/80 backdrop-blur-sm hover:border-indigo-500/30 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:hover:border-indigo-400/30'
                  }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      {/* Subject Badge */}
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${task.completed
                          ? 'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300'
                          : 'bg-indigo-100/80 text-indigo-800 dark:bg-indigo-500/20 dark:text-indigo-300'
                        }`}>
                        {task.subject}
                      </span>

                      {/* Priority Badge */}
                      {!task.completed && (
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${getPriorityStyles(task.priority)}`}>
                          {task.priority || "normal"}
                        </span>
                      )}
                    </div>

                    {/* Status Indicator */}
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors mt-0.5 ${task.completed
                        ? 'border-emerald-500 bg-emerald-500 text-white shadow-sm shadow-emerald-500/30 dark:border-emerald-400 dark:bg-emerald-400 dark:text-zinc-950'
                        : 'border-zinc-300 text-transparent dark:border-zinc-600 group-hover:border-indigo-300 dark:group-hover:border-indigo-500/50'
                      }`}>
                      {task.completed && (
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className={`font-semibold text-lg leading-snug ${task.completed ? 'text-zinc-500 line-through dark:text-zinc-500' : 'text-zinc-900 dark:text-zinc-100'
                      }`}>
                      {task.title}
                    </h3>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-zinc-100/80 pt-4 dark:border-zinc-800/50">
                  <div className={`flex items-center text-sm font-medium ${task.completed ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-500 dark:text-zinc-400'
                    }`}>
                    <svg className={`mr-2 h-4 w-4 shrink-0 ${!task.completed && task.priority === 'high' ? 'text-rose-500/70 dark:text-rose-400/70' : ''
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <time dateTime={task.dueDate}>
                      {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}
                    </time>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
