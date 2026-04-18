import React from "react";
import { Trash2, Edit2, CheckCircle2, Circle } from "lucide-react";

const TaskList = ({ tasks, onDelete, onComplete, onEdit }) => {
  if (!tasks.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 py-14 text-center shadow-sm">
        <Circle size={48} className="mx-auto mb-4 text-slate-400" />
        <p className="text-lg font-medium text-slate-600">
          No tasks found. Create one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => {
        const taskId = task?._id || task?.id;

        return (
          <div
            key={taskId || `${task.title || "task"}-${index}`}
            className={`rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 flex-1 items-start gap-4">
                <button
                  type="button"
                  onClick={() => onComplete(taskId, task.completed)}
                  className={`mt-1 rounded-full transition cursor-pointer ${
                    task.completed
                      ? "text-green-500"
                      : "text-slate-400 hover:text-green-500"
                  }`}
                >
                  {task.completed ? (
                    <CheckCircle2 size={24} />
                  ) : (
                    <Circle size={24} />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <h3
                      className={`text-lg font-semibold ${
                        task.completed
                          ? "text-slate-500"
                          : "text-slate-900"
                      }`}
                    >
                      {task.title}
                    </h3>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        task.completed
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </span>
                  </div>

                  {task.description && (
                    <p
                      className={`mb-3 text-sm leading-6 text-slate-600`}
                    >
                      {task.description}
                    </p>
                  )}

                  {task.createdAt && (
                    <p className="text-xs text-slate-400">
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => onEdit(task)}
                  className="rounded-xl p-2 text-blue-600 transition hover:bg-blue-50"
                  title="Edit task"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(taskId)}
                  className="rounded-xl p-2 text-red-500 transition hover:bg-red-50"
                  title="Delete task"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
