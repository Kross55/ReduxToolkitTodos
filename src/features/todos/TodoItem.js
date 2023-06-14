import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo, deleteTodo } from "./todoSlice";
import {
  FILTER_ALL,
  FILTER_ACTIVE,
  FILTER_COMPLETED,
} from "./constants/filterTypes";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const handleToggle = () => {
    dispatch(toggleTodo({
      id: todo.id,
      completed: !todo.completed
    }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const isVisible = () => {
    switch (filter) {
      case FILTER_ALL:
        return true;
      case FILTER_ACTIVE:
        return !todo.completed;
      case FILTER_COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  };

  if (!isVisible()) {
    return null;
  }

  const textStyle = {
    textDecoration: todo.completed ? 'line-through' : 'none',
  };

  return (
    <div className="todo">
      <span
        className="todo-text"
        style={textStyle}
        onClick={handleToggle}
      >
        {todo.text}
      </span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TodoItem;
