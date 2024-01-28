import React, { useState, useEffect } from 'react';

const TodoList = () => {
const [tasks, setTasks] = useState([]);

const [newTask, setNewTask] = useState('');

useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
    setTasks(JSON.parse(storedTasks));
    }
}, []);


useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);


const addTask = () => {
    if (newTask.trim() !== '') {
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask('');
    }
};


const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
};


const toggleCompletion = (index) => {
    setTasks(
    tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
    )
    );
};

return (
    <div>
        <div>
        <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
        </div>
    
    <div>
        {tasks.map((task, index) => (
        <div key={index}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
            </span>
            <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleCompletion(index)}
            />
            <button onClick={() => removeTask(index)}>Delete</button>
        </div>
        ))}
    </div>

    </div>
);
};

export default TodoList;