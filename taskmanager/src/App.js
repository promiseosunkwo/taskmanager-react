import './App.css';
import Header from './Header.js';
import Tasks from './Tasks';
import {useState, useEffect} from 'react';
import AddTask from './AddTask';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

// effect for json getting data from db
  useEffect(() => {
    const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
    }
  getTasks()
}, [])



// fetching data from db function
const fetchTasks = async () => {
const res = await fetch('http://localhost:5000/tasks')
const data = await res.json()
return data
}


//  add task
  const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks',
  {
    method: "POST",
    headers: {
    'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })
  const data = await res.json()
  setTasks([...tasks, data])
  }



// fetching data from db for updating the reminder
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  return data
  }



//  delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method: "DELETE",

    }) 
  // setTasks(tasks.filter((task)=> task.id !== id ))
} 

// set reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`,
  {
    method: "PUT",
    headers: {
    'Content-type': 'application/json',
    },
    body: JSON.stringify(updateTask),
  })
  const data = await res.json()

  setTasks(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
}

  return (
    <div className='container'>
        <Header title="Task Tracker" onAdd={() => setShowAddTask(!showAddTask)} showAdd= {showAddTask} />
        {showAddTask && <AddTask onAdd={addTask} />}
        

        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks to show'}
    </div>
  );
}

export default App;
