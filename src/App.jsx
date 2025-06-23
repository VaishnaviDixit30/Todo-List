import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage on mount (with safe parsing)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('todos');
      console.log("saved",saved);

      const parsed = saved ? JSON.parse(saved) : [];
      if (Array.isArray(parsed)) {
        setTodos(parsed);
      }
    } catch (error) {
      console.error('Failed to load todos from localStorage:', error);
    }
  }, []);

  // Save todos to localStorage on change
  // useEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(todos));
  // }, [todos]);

  const handleAddTodo = () => {
    if (todo.trim() !== '') {
      let temp = [...todos,todo];
      console.log("temp",temp);
      setTodos(temp);
      console.log("Todos",todos);
      localStorage.setItem('todos', JSON.stringify(temp));
      setTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    let temp = todos.filter((_, i) => i !== index);
    setTodos(temp);
    localStorage.setItem('todos', JSON.stringify(temp));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl space-y-8">
        {/* Add Todo Section */}
        <section>
          <h2 className="text-2xl font-semibold text-violet-700 mb-4">Add a Todo</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
              placeholder="What do you want to do?"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button
              className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-lg transition"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
        </section>

        {/* Todo List Section */}
        <section>
          <h2 className="text-2xl font-semibold text-violet-700 mb-4 mt-20">Your Todos</h2>
          {todos.length === 0 ? (
            <p className="text-gray-500">No todos yet. Start by adding one above!</p>
          ) : (
            <ul className="flex flex-col space-y-3">
              {todos.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-violet-50 px-4 py-3 rounded-md shadow-sm border border-violet-100 mb-5"
                >
                  <span className="text-gray-800">{item}</span>
                  <button
                    className="text-red-500 hover:text-red-700 font-medium"
                    onClick={() => handleDeleteTodo(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

export default App;
