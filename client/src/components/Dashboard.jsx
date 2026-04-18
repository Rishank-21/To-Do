import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Plus,
  LogOut,
  AlertCircle,
  CheckCircle2,
  Circle,
  Layers,
  Search,
} from "lucide-react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const normalizeTask = (task) => {
  if (!task) {
    return null;
  }

  const taskId = task._id || task.id;
  const status = task.status || (task.completed ? "completed" : "pending");

  return {
    ...task,
    _id: taskId,
    id: taskId,
    status,
    completed: status === "completed",
  };
};

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const loadTasks = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${API_BASE_URL}/tasks/all`,
        getHeaders(),
      );
      const taskList = Array.isArray(response.data?.tasks)
        ? response.data.tasks
        : [];

      setTasks(taskList.map(normalizeTask).filter(Boolean));
    } catch {
      setError("Failed to load tasks. Please try again.");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      void loadTasks();
    }, 0);

    return () => clearTimeout(timerId);
  }, []);

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (filter === "completed") {
      result = result.filter((task) => task.completed);
    } else if (filter === "pending") {
      result = result.filter((task) => !task.completed);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query),
      );
    }

    return result;
  }, [tasks, filter, searchQuery]);

  const handleAddTask = async (taskData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/tasks/create`,
        taskData,
        getHeaders(),
      );
      const newTask = normalizeTask(response.data?.task);

      if (newTask) {
        setTasks((prev) => [newTask, ...prev]);
      }

      setShowForm(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add task.");
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/tasks/edit/${taskId}`,
        taskData,
        getHeaders(),
      );
      const updatedTask = normalizeTask(response.data?.task);

      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task)),
      );
      setEditingTask(null);
      setShowForm(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/delete/${taskId}`, getHeaders());
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task.");
    }
  };

  const handleCompleteTask = async (taskId, currentStatus) => {
    if (!taskId) {
      setError("Task id is missing.");
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/tasks/status/${taskId}`,
        { status: currentStatus ? "pending" : "completed" },
        getHeaders(),
      );
      const updatedTask = normalizeTask(response.data?.task);

      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task)),
      );
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe_0%,#eff6ff_28%,#f8fafc_62%,#ffffff_100%)]">
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 shadow-sm">
              <Layers size={20} className="text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight text-slate-900">
                TaskFlow
              </p>
              <p className="text-sm text-slate-500">
                Welcome back, {user?.name || user?.fullName || "User"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 cursor-pointer"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="mb-8 rounded-[28px] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                Dashboard
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Manage your daily tasks in one place.
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                Add new tasks, update progress, and keep track of what is done
                and what still needs attention.
              </p>
            </div>

            {!showForm && (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 cursor-pointer"
              >
                <Plus size={20} />
                Add New Task
              </button>
            )}
          </div>
        </section>



                {showForm && (
          <div className="mb-6">
            <TaskForm
              key={editingTask?._id || "new-task"}
              onSubmit={
                editingTask
                  ? (data) => handleUpdateTask(editingTask._id, data)
                  : handleAddTask
              }
              initialData={editingTask}
              isEditing={Boolean(editingTask)}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
            />
          </div>
        )}

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Tasks</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{stats.total}</p>
              </div>
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                <Circle size={28} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Completed</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {stats.completed}
                </p>
              </div>
              <div className="rounded-2xl bg-green-50 p-3 text-green-600">
                <CheckCircle2 size={28} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Pending</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{stats.pending}</p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-3 text-amber-600">
                <Circle size={28} />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}



        <div className="mb-6 rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xl">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  filter === "all"
                    ? "bg-slate-900 text-white"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilter("pending")}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  filter === "pending"
                    ? "bg-amber-500 text-white"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => setFilter("completed")}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  filter === "completed"
                    ? "bg-green-600 text-white"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-slate-900" />
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onDelete={handleDeleteTask}
            onComplete={handleCompleteTask}
            onEdit={(task) => {
              setEditingTask(task);
              setShowForm(true);
            }}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
