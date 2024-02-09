// TodoList.tsx
import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';
import { getTodos, addTodo, deleteTodo, updateTodo, updateTodoOrder } from '../services/todoService';
import Form from './Form';
import { useNavigate } from 'react-router-dom';


interface TodoListProps {
  todos?: any[];
  token: any
}

const TodoList: React.FC<TodoListProps> = ({ todos: initialTodos, token }) => {
  const [todos, setTodos] = useState(initialTodos || []);
  // const inputEl = useRef(null)
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");

  const navigate = useNavigate();
  useEffect(()=>{
    console.log(token);
    if (!token) {
        navigate('/signup'); // Redirect to "/signup" if there is no token
        // return null; // Return null to avoid rendering the rest of the component
    }
    navigate("/")
  },[])

  const fetchData = async () => {
    // if (!initialTodos) {
      const todosData = await getTodos();
      setTodos(todosData);
    // }
  };

  useEffect(() => {
    fetchData();
  }, [initialTodos]);

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;
    const items = Array.from(todos); // Change 'tasks' to 'todos'
    const [reorderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItems);
    setTodos(items); // Change 'setTasks' to 'setTodos'
  }

  function addTask(task: any){
    let newTask = {
        title:task,
        completed:false
    }
    // Add the new task
    addTodo(newTask)
    .then(() => {
        // Fetch updated data after adding the task
        fetchData();
    })
    .catch((error) => {
        console.error("Error adding todo:", error);
    });
    }

    const handleUpdate = async (updatedTask: any) => {
      let updatedTodo = {
        title:updatedTask,
        completed:false
      }
      let id = editId;
      try {
        if (id) {
          // Implement update logic here (e.g., call a service to update the todo)
          await updateTodo(id, updatedTodo);
  
          // Update the todo in the local state
          const updatedTodos = todos.map((todo) =>
            todo._id === id ? { ...todo, ...updatedTodo } : todo
          );
  
          // Set the updated todos
          setTodos(updatedTodos);
        } else {
          console.error("Invalid id for update:", id);
        }
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    };

  const handleDelete = async (id: any) => {
    try {
        if (id) {
            // Implement delete logic here (e.g., call a service to delete the todo)
            await deleteTodo(id);

            // Create a new array without the deleted item
            const updatedTodos = todos.filter((todo) => todo._id !== id);

            // Set the updated todos
            setTodos(updatedTodos);
        } else {
            console.error("Invalid id for deletion:", id);
        }
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
  };

  return (
    <>
        <Form todos={todos} addTask={addTask} handleUpdate={handleUpdate} isEditing={isEditing} setIsEditing={setIsEditing} editId={editId} setEditId={setEditId}/>
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos">
                {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {todos.map((todo: any, index: number) => (
                    <Draggable key={todo._id} draggableId={todo._id} index={index}>
                        {(provided) => (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <TodoItem todo={todo} handleDelete={handleDelete} setIsEditing={setIsEditing} setEditId={setEditId}/>
                        </div>
                        )}
                    </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </DragDropContext>
    </>
  );
};

export default TodoList;
