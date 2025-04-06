
import { useState, useEffect } from "react";
import { track } from "../utils/analytics";
import { Button } from "../components/ui/button";
import TodoItem from "../components/TodoItem";
import { Input } from "../components/ui/input";
import { Pencil, Plus } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete project proposal", completed: false },
    { id: 2, text: "Schedule team meeting", completed: true },
    { id: 3, text: "Research new technologies", completed: false }
  ]);
  
  // Track page view when component mounts
  useEffect(() => {
    track('page_view', { page: 'dashboard' });
    
    // Record session duration
    const interval = setInterval(() => {
      track('session_duration', { 
        page: 'dashboard',
        seconds: 30
      });
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Track tab change
    track('tab_change', { 
      from: activeTab, 
      to: tab 
    });
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
      
      // Track todo creation
      track('todo_add', { 
        todo_id: newTodoItem.id,
        character_count: newTodo.length
      });
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const updatedTodo = { ...todo, completed: !todo.completed };
        
        // Track todo status change
        track('todo_status_change', { 
          todo_id: id, 
          new_status: updatedTodo.completed ? 'completed' : 'active'
        });
        
        return updatedTodo;
      }
      return todo;
    }));
  };

  // Filter todos based on active tab
  const filteredTodos = activeTab === "all" 
    ? todos 
    : activeTab === "active" 
      ? todos.filter(todo => !todo.completed) 
      : todos.filter(todo => todo.completed);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>
        <p className="text-gray-600 mt-2">
          Manage your daily tasks and stay organized
        </p>
      </div>
      
      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo} className="mb-6 flex gap-2">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow"
        />
        <Button type="submit">
          <Plus className="h-4 w-4 mr-1" />
          Add Task
        </Button>
      </form>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8" aria-label="Tabs">
          {['all', 'active', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              aria-current={activeTab === tab ? 'page' : undefined}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Todo List */}
      <div className="space-y-4">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <Pencil className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-lg">No tasks in this category</p>
            <p>Add a new task or switch categories</p>
          </div>
        ) : (
          <div>
            {filteredTodos.map(todo => (
              <div key={todo.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 mr-3 focus:ring-blue-500"
                />
                <div className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  <TodoItem
                    id={todo.id}
                    text={todo.text}
                    onDelete={handleDeleteTodo}
                    onEdit={handleEditTodo}
                  />
                </div>
              </div>
            ))}
            <div className="pt-4 border-t mt-4">
              <p className="text-sm text-gray-600">
                {filteredTodos.length} {filteredTodos.length === 1 ? 'task' : 'tasks'} {activeTab !== 'all' && `(${activeTab})`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
