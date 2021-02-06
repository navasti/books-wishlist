import './styles/index.scss'
import {
  getFormElements,
  capitalizeFirstLetter,
  getSelectElements,
} from './js/helpers'
import Book from './js/Book'
import UI from './js/UI'
import Storage from './js/Storage'

const {
  sortSelect,
  authorSelect,
  categorySelect,
  prioritySelect,
} = getSelectElements()
const form = document.querySelector('#add-form')
const resetButton = document.querySelector('.reset-filters')
const wishlist = document.querySelector('.wishlist')
const modal = document.querySelector('.modal')
const modalClose = document.querySelector('.modal-close')
const modalOpen = document.querySelector('.modal-open')

document.addEventListener('DOMContentLoaded', () => {
  UI.displayBooks()
  UI.updateBooksCounter()
  UI.getAndDisplayAuthors()
})

modalOpen.addEventListener('click', () => UI.toggleModal('block'))
modalClose.addEventListener('click', () => UI.toggleModal())
window.addEventListener('click', (e) => {
  if (e.target === modal) UI.toggleModal()
})

const handleFilterSelectChange = (e) => {
  const { target } = e
  const { value } = target
  UI.filterList(target, value)
}

authorSelect.addEventListener('change', (e) => handleFilterSelectChange(e))
categorySelect.addEventListener('change', (e) => handleFilterSelectChange(e))
prioritySelect.addEventListener('change', (e) => handleFilterSelectChange(e))
sortSelect.addEventListener('change', (e) => {
  const { value } = e.target
  UI.sortBooks(value)
})

resetButton.addEventListener('click', () => UI.resetFiltersAndRestoreList())

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const formElements = getFormElements()
  const title = capitalizeFirstLetter(formElements.title.value)
  const author = capitalizeFirstLetter(formElements.author.value)
  const category = capitalizeFirstLetter(formElements.category.value)
  const priority = capitalizeFirstLetter(formElements.priority.value)
  if (title === '' || author === '' || category === '' || priority === '') {
    console.error('Some of fields are empty')
  } else {
    const book = new Book(title, author, category, priority)
    Storage.addBookToStorage(book)
    UI.addBookToList(book)
    UI.getAndDisplayAuthors()
    UI.updateBooksCounter()
    UI.clearFormFields()
    UI.resetFiltersAndRestoreList()
    UI.toggleModal()
  }
})

wishlist.addEventListener('click', (e) => {
  Storage.removeBookFromStorage(e.target.parentElement.parentElement.id)
  UI.deleteBookFromList(e.target)
  UI.getAndDisplayAuthors()
  UI.updateBooksCounter()
})
