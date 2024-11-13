import React, { useState, useEffect, useRef } from 'react';

interface Task {
  id: number;
  title: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const taskInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const parsedTasks: Task[] = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [tasks]);

  const addTask = () => {
    if (taskInputRef.current && taskInputRef.current.value.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: taskInputRef.current.value.trim(),
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      taskInputRef.current.value = '';
    }
  };

  const handleDelete = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>
      <div className="flex items-center gap-2 mb-4">
        <input
          ref={taskInputRef}
          type="text"
          placeholder="New Task"
          className="border border-gray-900 rounded px-3 py-2 w-72 focus:outline-none placeholder:text-black focus:ring focus:border-black"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>
      <ul className="list-none p-0 flex gap-3 flex-wrap">
        {tasks.map((task) => (
          <li key={task.id} className="mt-2 text-lg text-gray-700">
            <div className="border py-3 px-2 text-center">
              <h1 className="mb-3 text-xl">{task.title}</h1>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-600 text-white px-6 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
