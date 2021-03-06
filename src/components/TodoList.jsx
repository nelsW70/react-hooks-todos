import React, { useContext } from 'react';
import axios from 'axios';
import TodosContext from '../context';

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext);
  const title =
    state.todos.length > 0 ? `${state.todos.length} Todos` : 'Nothing to do!';

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-bold p-8">{title}</h1>
      <ul className="list-reset text-white p-0">
        {state.todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center bg-orange-dark border-black border-2 my-2 py-4"
          >
            <span
              onDoubleClick={async () => {
                const response = await axios.patch(
                  `https://hooks-api-flame.vercel.app/todos/${todo.id}`,
                  {
                    complete: !todo.complete
                  }
                );
                dispatch({ type: 'TOGGLE_TODO', payload: response.data });
              }}
              className={`flex-1 ml-12 cursor-pointer ${
                todo.complete && 'line-through text-grey-darkest'
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() =>
                dispatch({ type: 'SET_CURRENT_TODO', payload: todo })
              }
            >
              <span className="material-icons pr-3">edit</span>
            </button>
            <button
              onClick={async () => {
                await axios.delete(
                  `https://hooks-api-flame.vercel.app/todos/${todo.id}`
                );
                dispatch({ type: 'REMOVE_TODO', payload: todo });
              }}
            >
              <span className="material-icons pr-4">delete</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
