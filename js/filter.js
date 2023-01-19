export default function Filter({ removeHiddenArray, containerTodo }) {
  const filteringTasks = (todos, select) => {
    removeHiddenArray(todos)
    todos.filter(todo => {
      const containDone = todo.classList.contains('done')

      return select === 'done' ? !containDone : containDone
    }).forEach(todo => todo.classList.add('hidden'))
  }

  const filterTodo = (evnt) => {
    const valueOfselect = evnt.target.value
    const match = valueOfselect === 'all'
    const allTodos = Array.from(containerTodo.children)

    // eslint-disable-next-line no-unused-expressions
    match ? removeHiddenArray(allTodos) : filteringTasks(allTodos, valueOfselect)
  }

  return {
    filterTodo,
  }
}
