const formatTodo = content => {
  const li = document.createElement('li')
  const todoFormatted = `
      <h5>${content}</h5>
      <button class="gear" data-gear="${content}">
        <i class="fa-solid fa-gear"></i>
      </button>
      <span class="checked" data-check="${content}">
        <i class="fa-sharp fa-solid fa-check"></i>
      </span>
      <span class="edit" data-edit="${content}">
        <i class="fa-solid fa-pencil sizeIcon"></i>
      </span>
      <span class="delete" data-delete="${content}">
        <i class="fa-solid fa-trash sizeIcon"></i>
      </span>
    `
  li.setAttribute('class', 'task')
  li.setAttribute('data-todo', content)
  li.innerHTML = todoFormatted

  return li
}

export default function Utilities({ containerTodo, setTodoInTheBank, getTodoBank }) {
  const updatingScreen = () => {
    const bankOfTodos = getTodoBank()

    bankOfTodos.forEach(({ name, status }) => {
      const li = formatTodo(name)

      if (status) {
        li.classList.add('done')
      }

      containerTodo.append(li)
    })
  }

  const addTodoInContainer = (evnt, value) => {
    const todo = formatTodo(value)

    setTodoInTheBank(todo)
    containerTodo.prepend(todo)
    evnt.target.reset()
  }

  const formsMessages = {
    addMessage(messag, msg) {
      messag.setAttribute('class', msg)
    },
    resetCount(messag, count) {
      count.textContent = '0/45'
      this.addMessage(messag, 'invisible')
      count.setAttribute('class', 'invisible')
    },
    emptyField(msg) {
      msg.textContent = 'Campo vázio'
      this.addMessage(msg, 'empty')
    },
    fullField(msg) {
      msg.textContent = 'Número máximo de digitos'
      this.addMessage(msg, 'full')
    },
    countAndShowDigits(value, count) {
      count.textContent = `${value.length}/45`
    },
    addColorCount(count, color) {
      count.style.color = color
    },
  }

  const getTodo = (evnt, message, count) => {
    evnt.preventDefault()

    const inputValue = evnt.target.content.value.trim()
    formsMessages.resetCount(message, count)

    if (!inputValue) {
      formsMessages.emptyField(message)
      return
    }

    addTodoInContainer(evnt, inputValue, containerTodo)
  }

  const toggleForms = (formOne, formTwo) => {
    formOne.parentElement.classList.add('hidden')
    formTwo.parentElement.classList.remove('hidden')
  }

  const handleFormMessages = (evnt, count, message) => {
    const inputValue = evnt.target.value.trim()
    const setMaximumNumberOfDigits = inputValue.length === 45

    count.classList.remove('invisible')
    formsMessages.countAndShowDigits(inputValue, count)

    if (!inputValue.length) {
      formsMessages.addMessage(count, 'invisible')
    }

    if (setMaximumNumberOfDigits) {
      formsMessages.fullField(message)
      formsMessages.addColorCount(count, '#FF8888')
      return
    }

    formsMessages.addColorCount(count, '#9c9c9c')
    formsMessages.addMessage(message, 'invisible')
  }

  const removeHiddenArray = array => array
    .forEach(element => element.classList.remove('hidden'))

  return {
    getTodo,
    formsMessages,
    toggleForms,
    handleFormMessages,
    removeHiddenArray,
    updatingScreen,
  }
}
