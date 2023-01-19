/* eslint-disable import/extensions */
import Utilities from './utilities.js'
import CreateNewTodo from './create_new_todo.js'
import EditTodo from './edit_todo.js'
import TodoListFeatures from './todo_list_features.js'
import SearchTodo from './search.js'
import Filter from './filter.js'
import LocalStorage from './local_storage.js'

// Calls
const formAddTodo = document.querySelector('.addTask form')
const formEditTodo = document.querySelector('.editTask form')
const containerTodo = document.querySelector('.tasks')
const fieldSearch = document.querySelector('.search input')
const fieldFilter = document.querySelector('.filter')

const addMessage = document.getElementById('addMessage')
const addCount = document.querySelector('#addCount')
const editCount = document.querySelector('#editCount')
const editMessage = document.querySelector('#editMessage')
const buttonCancel = document.querySelector('#cancel')
const buttonBackSpace = fieldSearch.nextElementSibling

const localstorage = LocalStorage()

const utilities = Utilities({
  containerTodo,
  setTodoInTheBank: localstorage.setTodoInTheBank,
  getTodoBank: localstorage.getTodoBank,
})

utilities.updatingScreen()

const createNewTodo = CreateNewTodo({ getTodo: utilities.getTodo })

const editTodo = EditTodo({
  getTodo: utilities.getTodo,
  toggleForms: utilities.toggleForms,
  formsMessages: utilities.formsMessages,
  formEditTodo,
  formAddTodo,
  editMessage,
  removeTodoInTheBank: localstorage.removeTodoInTheBank,
})

const todoListFeatures = TodoListFeatures({
  formAddTodo,
  formEditTodo,
  toggleForms: utilities.toggleForms,
  removeTodoInTheBank: localstorage.removeTodoInTheBank,
  checkedTodoInTheBank: localstorage.checkedTodoInTheBank,
})

const searchTodo = SearchTodo({
  removeHiddenArray: utilities.removeHiddenArray,
  containerTodo,
  fieldSearch,
})

const filter = Filter({
  removeHiddenArray: utilities.removeHiddenArray,
  containerTodo,
})

// Events
formAddTodo.addEventListener('submit', event =>
  createNewTodo.addNewTodo(event, addMessage, addCount))

formAddTodo.addEventListener('input', event =>
  utilities.handleFormMessages(event, addCount, addMessage))

formEditTodo.addEventListener('input', event =>
  utilities.handleFormMessages(event, editCount, editMessage))

formEditTodo.addEventListener('submit', event =>
  editTodo.editTodo(event, todoListFeatures.todoCLicked(), editCount))

buttonCancel.addEventListener('click', event =>
  editTodo.buttonCancel(event, todoListFeatures.todoCLicked()))

containerTodo.addEventListener('click', event =>
  todoListFeatures.getClickedFunctionality(event))

fieldSearch.addEventListener('input', event => searchTodo.search(event))

buttonBackSpace.addEventListener('click', event =>
  searchTodo.buttonBackSpace(event))

fieldFilter.addEventListener('input', (event) => filter.filterTodo(event))
