import {
  compareValues,
  getFormElements,
  getSelectElements,
  capitalizeFirstLetter,
  clearFilterFields,
} from './helpers'
import Storage from './Storage'

const modal = document.querySelector('.modal')
const span = document.querySelector('.main>span')
const { authorSelect } = getSelectElements()

class UI {
  static displayBooks() {
    const storedBooks = Storage.getBooksFromStorage()
    storedBooks.forEach((book) => {
      this.addBookToList(book)
    })
  }

  static toggleModal(display = null) {
    display === 'block'
      ? (modal.style.display = 'block')
      : (modal.style.display = 'none')
  }

  static getAndDisplayAuthors() {
    const books = Storage.getBooksFromStorage()
    const options = [...authorSelect.children]
    if (options.length > 1) {
      options.forEach((option, index) => {
        if (index > 0) {
          authorSelect.removeChild(option)
        }
      })
    }
    const authors = []
    books.forEach((book) => {
      if (authors.includes(book.author)) return
      authors.push(book.author)
    })
    if (authors.length > 0) {
      authors.forEach((author) => {
        const option = document.createElement('option')
        option.value = author
        option.textContent = `${author}`
        authorSelect.appendChild(option)
      })
    }
  }

  static resetFiltersAndRestoreList() {
    clearFilterFields()
    this.deleteAllBooksFromList()
    this.displayBooks()
  }

  static filterList(target, value) {
    const books = Storage.getBooksFromStorage()
    const filtered = []
    const author = target.id.includes('author')
    const category = target.id.includes('category')
    const priority = target.id.includes('priority')
    if (author) {
      books.forEach((book) => {
        if (book.author === value) filtered.push(book)
      })
      clearFilterFields('author')
    } else if (category) {
      books.forEach((book) => {
        if (book.category === capitalizeFirstLetter(value)) filtered.push(book)
      })
      clearFilterFields('category')
    } else if (priority) {
      books.forEach((book) => {
        if (book.priority === value) filtered.push(book)
      })
      clearFilterFields('priority')
    }
    this.deleteAllBooksFromList()
    if (filtered.length > 0) {
      filtered.forEach((book) => this.addBookToList(book))
    }
  }

  static updateBooksCounter() {
    const books = Storage.getBooksFromStorage().length
    const counter = document.querySelector('.counter')
    if (books === 0) {
      span.innerHTML = 'Start adding books that you want to read :)'
      span.style.display = 'block'
    } else {
      span.innerHTML = ''
      span.style.display = 'none'
    }
    if (books === 1) {
      counter.innerHTML = `You have already added ${books} book`
    } else {
      counter.innerHTML = `You have already added ${books} books`
    }
  }

  static sortBooks(value) {
    const books = Storage.getBooksFromStorage()
    this.deleteAllBooksFromList()
    let sorted
    if (value === 'title') {
      sorted = books.sort(compareValues('title'))
    } else if (value === 'author') {
      sorted = books.sort(compareValues('author'))
    } else if (value === 'category') {
      sorted = books.sort(compareValues('category'))
    } else if (value === 'priority') {
      sorted = books.sort(compareValues('priority'))
    }
    clearFilterFields('sort')
    sorted.forEach((book) => {
      this.addBookToList(book)
    })
  }

  static addBookToList(book) {
    const list = document.querySelector('.wishlist')
    const row = document.createElement('tr')
    row.id = book.id
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.category}</td>
      <td>${book.priority}</td>
      <td><a href='#' class="delete">X</a></td>
    `
    list.appendChild(row)
  }

  static clearFormFields() {
    const formElements = getFormElements()
    formElements.title.value = ''
    formElements.author.value = ''
    formElements.category.value = ''
    formElements.priority.value = ''
  }

  static deleteAllBooksFromList() {
    const wishlist = document.querySelector('.wishlist')
    const books = [...wishlist.children]
    books.forEach((book) => wishlist.removeChild(book))
  }

  static deleteBookFromList(element) {
    if (element.classList.contains('delete')) {
      element.parentElement.parentElement.remove()
    }
  }
}

export default UI
