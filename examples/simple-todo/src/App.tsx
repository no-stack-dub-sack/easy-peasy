import { Fragment, useState } from 'react';
import { Todo } from './store/model';
import { useStoreState, useStoreActions } from './store';

const App = () => {
  const { remainingTodos, completedTodos } = useStoreState((state) => state);

  return (
    <div>
      <h1>Todo list</h1>
      <ul>
        {[...remainingTodos, ...completedTodos].map((todo, idx) => (
          <li key={idx}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>

      <AddTodo />
    </div>
  );
};

const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { toggleTodo } = useStoreActions((actions) => actions);

  const Wrapper = todo.done ? 's' : Fragment;
  return (
    <Wrapper>
      <input
        name={todo.text}
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleTodo(todo)}
      />
      {todo.text}
    </Wrapper>
  );
};

const AddTodo = () => {
  const [todoText, setTodoText] = useState('');
  const { addTodo } = useStoreActions((actions) => actions);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo({ text: todoText, done: false });
        setTodoText('');
      }}
    >
      <input type="text" value={todoText} onChange={(e) => setTodoText(e.target.value)} />
      <button type="submit" disabled={!todoText.length}>
        Add todo
      </button>
    </form>
  );
};

export default App;
