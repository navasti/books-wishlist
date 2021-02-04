class Storage {
  static getBooksFromStorage() {
    let books
    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books
  }

  static addBookToStorage(book) {
    const books = this.getBooksFromStorage()
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBookFromStorage(id) {
    const books = this.getBooksFromStorage()
    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1)
      }
    })
    localStorage.setItem('books', JSON.stringify(books))
  }
}

export default Storage
