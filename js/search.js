export default function SearchTodo({ removeHiddenArray, containerTodo, fieldSearch }) {
  const showOrHideTodos = {
    filterTodos(todos, searchValue, returnMatchtedTodo) {
      const todosFilted = todos.filter(li => {
        const matched = li.textContent.toLowerCase().includes(searchValue)

        return returnMatchtedTodo ? matched : !matched
      })

      return todosFilted
    },
    hideTodos(todos, searchValue) {
      const todosFilted = this.filterTodos(todos, searchValue, false)
      todosFilted.forEach(li => li.classList.add('hidden'))
    },
    showTodos(todos, searchValue) {
      const todosFilted = this.filterTodos(todos, searchValue, true)
      removeHiddenArray(todosFilted)
    },
  }

  const organizesTasksAccordingToResearch = searchValue => {
    const allTodos = Array.from(containerTodo.children)

    showOrHideTodos.showTodos(allTodos, searchValue)
    showOrHideTodos.hideTodos(allTodos, searchValue)
  }

  const search = (evnt) => {
    evnt.preventDefault()
    const searchValue = evnt.target.value.toLowerCase().trim()

    organizesTasksAccordingToResearch(searchValue)
  }

  const buttonBackSpace = evnt => {
    evnt.preventDefault()
    const removeLastLetter = fieldSearch.value.substring(0, fieldSearch.value.length - 1)

    organizesTasksAccordingToResearch(removeLastLetter)
    fieldSearch.value = removeLastLetter
  }

  return {
    search,
    buttonBackSpace,
  }
}
