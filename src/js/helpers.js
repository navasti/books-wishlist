export const getFormElements = () => {
  const title = document.querySelector('#title')
  const author = document.querySelector('#author')
  const category = document.querySelector('#category')
  const priority = document.querySelector('#priority')
  const elements = {
    title,
    author,
    category,
    priority,
  }
  return elements
}

export const generateId = () => {
  return '_' + Math.random().toString(36).substr(2, 9)
}

export const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string') return null
  const capitalized = string.charAt(0).toUpperCase() + string.slice(1)
  return capitalized
}

export const compareValues = (key) => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0
    }
    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]
    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return comparison
  }
}
