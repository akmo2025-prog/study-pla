"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Task = {
  id: number;
  title: string;
  dueDate: string;
  subject: string;
  priority: string;
  completed: boolean;
};

export default function CalendarPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Load dynamically from local storage just like the rest of the application
    const stored = localStorage.getItem('study_tasks');
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  // Fill array for grid mapping
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Matches due date format from task creation "YYYY-MM-DD"
  const formatDateString = (y: number, m: number, d: number) => {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 p-6 sm:p-12 font-sans selection:bg-indigo-500/30 relative overflow-hidden">
      
      {/* Abstract background elements */}
      <div className="absolute top-0 right-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px] dark:bg-cyan-500/5 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto z-10 relative animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Calendar Header Control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">
              Calendar
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              View your deadlines and assignments by month.
            </p>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={prevMonth} aria-label="Previous Month" className="p-2 rounded-full border border-zinc-200 bg-white/50 hover:bg-zinc-50 transition-colors dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
               </svg>
             </button>
             <h2 className="text-xl font-bold min-w-[160px] text-center">{monthNames[month]} {year}</h2>
             <button onClick={nextMonth} aria-label="Next Month" className="p-2 rounded-full border border-zinc-200 bg-white/50 hover:bg-zinc-50 transition-colors dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
               </svg>
             </button>
          </div>
        </div>

        {/* The Grid Component */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white/80 backdrop-blur-md shadow-xl shadow-indigo-500/5 dark:border-zinc-800/80 dark:bg-zinc-900/80 overflow-hidden">
          {/* Weekday Row */}
          <div className="grid grid-cols-7 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-3 text-center text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 auto-rows-fr">
            {days.map((day, index) => {
              if (day === null) {
                return (
                  <div key={`empty-${index}`} className="min-h-[120px] p-2 border-b border-r border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/30 dark:bg-zinc-900/20"></div>
                );
              }

              const dateString = formatDateString(year, month, day);
              const dayTasks = tasks.filter(t => t.dueDate === dateString);
              // Calculate today intelligently independent of arbitrary TimeZones
              const today = new Date();
              const isToday = formatDateString(today.getFullYear(), today.getMonth(), today.getDate()) === dateString;

              return (
                <div key={day} className={`min-h-[140px] p-2 border-b border-r border-zinc-100 dark:border-zinc-800/50 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/30 ${isToday ? 'bg-indigo-50/30 dark:bg-indigo-900/10' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`inline-flex items-center justify-center w-7 h-7 text-sm font-medium rounded-full ${isToday ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25' : 'text-zinc-700 dark:text-zinc-300'}`}>
                      {day}
                    </span>
                  </div>
                  
                  {/* Task Indicators */}
                  <div className="space-y-1.5 overflow-y-auto max-h-[90px] custom-scrollbar pr-1">
                    {dayTasks.map(task => (
                      <Link 
                        href="/tasks" 
                        key={task.id} 
                        className={`block text-[11px] px-2 py-1.5 rounded truncate border ${task.completed 
                           ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400 line-through opacity-60 hover:opacity-100' 
                           : 'bg-white border-zinc-200 text-zinc-700 shadow-sm dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 hover:border-indigo-300 hover:shadow-indigo-500/10'} transition-all`} 
                        title={task.title}
                      >
                        {task.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
