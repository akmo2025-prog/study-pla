import { readFileSync, writeFileSync } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'tasks.json');

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // In Next.js 15+, dynamic route params are Promises that must be awaited
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    
    // Read the file
    const data = JSON.parse(readFileSync(dataFilePath, 'utf8'));
    
    // Find index of the task to delete
    const taskIndex = data.tasks.findIndex((t: any) => t.id === id);
    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Remove task
    data.tasks.splice(taskIndex, 1);

    // Save back to file safely using synchronous FS matching your POST/GET routes
    writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete task:", error);
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
