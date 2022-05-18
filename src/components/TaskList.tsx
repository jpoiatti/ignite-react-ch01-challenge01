import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Create a new task with random ID, not allowing an empty title.
    // Check if newTaskTitle is empty or filled with blank spaces
    let emptyTaskTitle: Boolean = newTaskTitle.replace(/\s/g,"") == "";
    if (!emptyTaskTitle) {
      let newTask: Task = {
        id: Math.random()*100,
        title: newTaskTitle,
        isComplete: false,
      }
      setTasks([...tasks, newTask]);
      // Clear NewTaskTitle state
      setNewTaskTitle('');
    } 
  }

  function handleToggleTaskCompletion(id: number) {
    // Switch the field 'isComplete' between 'true' or 'false', using a task ID
    let taskIndex = tasks.findIndex(task => task.id === id);
    let updatedTasks = [...tasks];
    updatedTasks[taskIndex].isComplete = !updatedTasks[taskIndex].isComplete;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    // Remove a task from the state array using its ID
    let taskIndex = tasks.findIndex(task => task.id === id);
    let updatedTasks = [...tasks];
    updatedTasks.splice(taskIndex, 1);
    setTasks(updatedTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}