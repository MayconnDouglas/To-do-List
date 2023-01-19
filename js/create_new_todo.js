export default function CreateNewTodo({ getTodo }) {
  const addNewTodo = (evnt, addMessage, addCount) => getTodo(evnt, addMessage, addCount)

  return {
    addNewTodo,
  }
}
