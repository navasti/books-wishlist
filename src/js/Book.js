import { generateId } from './helpers'

class Book {
  constructor(title, author, category, priority) {
    this.title = title
    this.author = author
    this.category = category
    this.priority = priority
    this.id = generateId()
  }
}

export default Book
