import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 } from "uuid";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";
import Header from "./components/Header/Header";
import All from "./pages/All/All";
import Active from "./pages/Active/Active";
import Completed from "./pages/Completed/Completed";

function App() {
  // State and hooks
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const todoFromLocal = localStorage.getItem("todos");
    if (todoFromLocal) {
      setTodoList(JSON.parse(todoFromLocal));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  //   Functions
  const onAddTodo = (title) => {
    const newTodo = {
      id: v4(),
      title,
      isDone: false,
    };
    setTodoList((prevList) => [newTodo, ...prevList]);
  };

  const onItemChecked = (itemId) => {
    const itemIndex = todoList.findIndex(({ id }) => id === itemId);
    const newTodo = [...todoList];
    const newTodoItem = {
      ...newTodo[itemIndex],
      isDone: !newTodo[itemIndex].isDone,
    };
    newTodo[itemIndex] = newTodoItem;
    setTodoList(newTodo);
  };

  const onItemRemoved = (itemId) => {
    const newTodo = todoList.filter((item) => item.id !== itemId);
    setTodoList(newTodo);
  };
  const onDeleteList = (todoId) => {
    const deleteList = todoList.filter((item) => {
      return item.id === undefined;
    });
    setTodoList(deleteList);
  };
  const onUpdateTodoItem = (newValue, todoId) => {
    const updatingTodoItemIndex = todoList.findIndex(
      (todo) => todo.id === todoId
    );

    const nextTodoList = [...todoList];

    nextTodoList[updatingTodoItemIndex] = {
      ...nextTodoList[updatingTodoItemIndex],
      title: newValue,
    };

    setTodoList(nextTodoList);
  };

  return (
    <div className="main">
      <h2>#ToDo</h2>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/All" element={<All />} />
          <Route path="/Active" element={<Active />} />
          <Route path="/Completed" element={<Completed />} />
        </Routes>
      </BrowserRouter>
      <TodoForm onAddTodo={onAddTodo} />
      <TodoList
        todoList={todoList}
        onItemChecked={onItemChecked}
        onItemRemoved={onItemRemoved}
        onUpdateTodoItem={onUpdateTodoItem}
        onDeleteList={onDeleteList}
      />
    </div>
  );
}

export default App;
