


// interface to shape our data

import { useEffect, useState } from "react"

interface Task{
  id: number,
  text: string,
  complete: boolean
}

// key for our local storage saved to a variable
const storageKey = 'Tasks';


const App = () => {

  // State for managing our tasks, input, and edit mode
  const [task, setTask] = useState<Task[]>(() =>{
    const storedTask = localStorage.getItem(storageKey);
    return storedTask ? JSON.parse(storedTask): [];
  })
  const [input, setInput] = useState<string>("")
  const [editingId, setEditingId] = useState<number | null> (null)

  // load task from local storage
  //useEffect will run what is inside as soon as the app component is loaded

  useEffect(() => {
    
    const storedTasks = localStorage.getItem(storageKey);
   
    if(storedTasks)
    {
     setTask(JSON.parse(storedTasks));
    }
  
    
  }, []);


  // save the tasks to local storage when the tasks change

  useEffect(() => {
    
    localStorage.setItem(storageKey,JSON.stringify(task));

  }, [task]);
  


  //functions will go below.............


  // function to add or update a task

  const addTask = () => {

    // editing

    if(input === "") return;

    if(editingId != null){

      const updateTasks = task.map((task) => (
        task.id === editingId ? {...task, text: input} : task
      ));
      setTask(updateTasks);
      setEditingId(null);
      setInput("");

    } else{
      // adding task

      const newTask: Task = {
        id:Date.now(),
        text:input,
        complete: false
      }
      setTask([newTask, ...task])
      setInput('');

    }
  }


  // function to start editing the task

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setInput(text);
  }


  // function to cancel the edit
  const cancelEdit = () =>{
    setEditingId(null);
    setInput("");
  }


  // function to delete the task
  const deleteTask = (id:number) => {
    const deletedItem = task.filter((task) => task.id !== id);
    setTask(deletedItem);
  }


  // function to toggle the task status
  const toggleComplete = (id: number) => {
    const updateTasks =task.map((task) => task.id === id ? {...task, complete: !task.complete}: task)
  }


  return (

  

    <>
      <h1>One file App Task</h1>


    {/* map through our data and display in containers, row, col, ul, li, tr */}


    </>
  )
}

export default App