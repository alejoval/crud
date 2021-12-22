import React, { useState,useEffect } from "react";
import { isEmpty,size } from "lodash";
import { addDocumento, deleteDocument, getCollection, updateDocument } from "./actions";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    (async ()=>{
      const result=await getCollection("task")
      if(result.statusResponde){
        setTasks(result.data)
      }
      
    })()
  }, [])

  const validaForm = () => {
     let isValid=true
     setError(null)
     
    if (isEmpty(task)) {
      setError("Deber ingresar una tarea. ")
      isValid=false
   }
   return isValid
  }
  
  
  const addTask = async(e) => {
    e.preventDefault();
    
    if(!validaForm()){
      return
    }

    const result=await  addDocumento("task",{name:task})
    if(!result.statusResponde){
     setError(result.error)
     return
    }
    
    setTasks([...tasks, {id:result.data.id,name:task}]);
    setTask("");
  };

  const saveTask = async(e) => {
    e.preventDefault();
    if(!validaForm()){
      return
    }

    const result=await updateDocument("task",id,{name:task})
    if(!result.statusResponde){
      setError(result.error)
      return
    }

    const editedTasks=tasks.map(item=>item.id===id ? {id,name:task} : item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("");
    setId("")
  };

  const deleteTask = async(id) => {
    const result= await deleteDocument("task",id)
    if(!result.statusResponde){
      setError(result.error)
      return
    }
    const filteredTask = tasks.filter((task) => task.id != id);
    setTasks(filteredTask);
  };

  const editTask = (theTask) => {
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)

  };


  

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tarea</h4>
          {
            size(tasks) == 0 ?(
            <li className="list-group-item">Aun no hay tarea programadas.</li>
            ):(
              <ul className="list-group">
              {
              tasks.map((task) => (
                <li className="list-group-item" key={task.id}>
                  <span className="lead">{task.name}</span>
                  <button
                    className="btn btn-danger bt-sm float-right mx-2"
                    onClick={() => deleteTask(task.id)}
                  >
                    Eliminar
                  </button>
                  <button 
                  className="btn btn-warning bt-sm float-right"
                  onClick={() => editTask(task)}
                  >
                    Editar
                  </button>
                </li>
              ))
              }
            </ul> 
            )
            }
        </div>
        <div className="col-4">
          <h4 className="text-center">{ editMode? "Modificar Tarea" :"Agregar Tarea"}</h4>
          <form onSubmit={ editMode ? saveTask : addTask }> 
          {
              error && <span className="text-danger">{error}</span>
            }
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la tarea"
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />
            
            <button className={editMode ? "btn btn-warning btn-block":"btn btn-dark btn-block"}
             type="submit">
              { editMode ? "Guardar" :"Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
