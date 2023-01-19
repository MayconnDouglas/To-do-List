/* eslint-disable no-unused-expressions */
export default function LocalStorage() {
  const getTodoBank = () => JSON.parse(localStorage.getItem('todoList')) ?? []

  const updateBank = bank =>
    localStorage.setItem('todoList', JSON.stringify(bank))

  const removeTodoInTheBank = todo => {
    const bankOfTodos = getTodoBank()
    bankOfTodos.forEach(({ name }, index) => {
      const match = name === todo.textContent.trim()

      if (match) {
        bankOfTodos.splice(index, 1)
      }
    })

    updateBank(bankOfTodos)
  }

  const setTodoInTheBank = todo => {
    const content = todo.textContent.trim()
    const statusTodo = todo.classList.contains('done')
    const bankOfTodos = getTodoBank()

    const formatTodo = {
      name: content,
      status: statusTodo,
    }

    bankOfTodos.unshift(formatTodo)
    updateBank(bankOfTodos)
  }

  const checkedTodoInTheBank = todo => {
    let bankOfTodos = getTodoBank()

    bankOfTodos = bankOfTodos.map(({ name, status }) => {
      const match = name === todo.textContent.trim()

      if (match) {
        status ? status = false : status = true
      }

      return { name, status }
    })

    updateBank(bankOfTodos)
  }

  return {
    setTodoInTheBank,
    removeTodoInTheBank,
    checkedTodoInTheBank,
    getTodoBank,
  }
}
