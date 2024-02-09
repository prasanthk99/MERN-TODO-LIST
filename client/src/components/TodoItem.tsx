import React from 'react';
import "../Assets/styles/todolist.css";

interface TodoItemProps {
  todo: any;
  handleDelete: (id: any) => void;
  // handleUpdate: () => void;
  setIsEditing : any,
  setEditId : any
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, handleDelete, setIsEditing, setEditId }) => {
  // Your component implementation here
  function handleEdit(){
    setIsEditing(true);
    setEditId(todo._id);
  }
  return (
    <div className='todo-item' style={{
    }}>
      {/* Your TodoItem component content */}
      <h4>{todo.title}</h4>
      <div>
        <button onClick={handleEdit}>Update</button>
        <button key={todo._id} onClick={() => handleDelete(todo._id)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;