import TodoItem from "../TodoItem/TodoItem";

const TodoList = ({
  todoList,
  onItemChecked,
  onItemRemoved,
  onUpdateTodoItem,
  onDeleteList,
}) => {
  const todoListValid = todoList && Array.isArray(todoList);
  const todoItemElements =
    todoListValid &&
    todoList.map((todo) => (
      <p key={todo.id}>
        <TodoItem
          {...todo}
          onItemChecked={onItemChecked}
          onItemRemoved={onItemRemoved}
          onUpdateTodoItem={onUpdateTodoItem}
        />
      </p>
    ));
  if (todoList.length > 0) {
    return (
      <div>
        <ul className="list">{todoItemElements}</ul>
        <button className="delete-all" onClick={onDeleteList}>
          Delete All
        </button>
      </div>
    );
  } else return;
};

export default TodoList;
