// Test import of a JavaScript function
import { example } from './js/example'

// Test import of an asset
import './styles/index.scss'

const heading = document.createElement('h1')
heading.textContent = example()

const app = document.querySelector('#root')
app.appendChild(heading)
