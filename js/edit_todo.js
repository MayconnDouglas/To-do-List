export default function EditTodo({
  getTodo,
  toggleForms,
  formsMessages,
  formEditTodo,
  formAddTodo,
  editMessage,
  removeTodoInTheBank,
}) {
  const buttonCancel = (evnt, todoCLicked) => {
    evnt.preventDefault()
    todoCLicked.classList.remove('editingTask')
    formsMessages.addMessage(editMessage, 'invisible')
    toggleForms(formEditTodo, formAddTodo)
  }

  const editTodo = (evnt, todo, editCount) => {
    getTodo(evnt, editCount, editMessage)
    toggleForms(formEditTodo, formAddTodo)

    removeTodoInTheBank(todo)
    todo.remove()
  }

  return {
    editTodo,
    buttonCancel,
  }
}
