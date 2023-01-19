/* eslint-disable no-unused-expressions */
const activeAnimationClass = li => li.classList.toggle('active')

export default function TodoListFeatures({
  formAddTodo,
  formEditTodo,
  toggleForms,
  removeTodoInTheBank,
  checkedTodoInTheBank,
}) {
  let upgradeTodo

  const todoFeatures = {
    li(functionality, clickedElement) {
      const li = `[data-todo="${clickedElement.dataset[functionality]}"]`
      return document.querySelector(li)
    },
    gear(clickedElement) {
      const li = this.li('gear', clickedElement)
      activeAnimationClass(li)
    },
    check(clickedElement) {
      const li = this.li('check', clickedElement)

      li.classList.toggle('done')
      checkedTodoInTheBank(li)
      activeAnimationClass(li)
    },
    delete(clickedElement) {
      const li = this.li('delete', clickedElement)

      removeTodoInTheBank(li)
      li.remove()
    },
    edit(clickedElement) {
      const todo = this.li('edit', clickedElement)
      const todoContent = todo.textContent.trim()
      upgradeTodo = todo

      todo.classList.add('editingTask')
      toggleForms(formAddTodo, formEditTodo)
      formEditTodo.content.setAttribute('placeholder', todoContent)
      activeAnimationClass(todo)
    },
  }

  const getClickedFunctionality = (evnt) => {
    const clickedElement = evnt.target
    const clickedFunctionality = ['edit', 'delete', 'gear', 'check']
      .find(element => clickedElement.dataset[element])
    if (clickedFunctionality) {
      todoFeatures[clickedFunctionality](clickedElement)
    }
  }

  const getUpgradeTodo = () => upgradeTodo

  return {
    getClickedFunctionality,
    todoCLicked: getUpgradeTodo,
  }
}
