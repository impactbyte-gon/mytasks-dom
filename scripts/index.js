// ---------------------------------------------------------------------------
// ELEMENTS
const taskListDOM = document.getElementById('task-list')

// ---------------------------------------------------------------------------
// STORAGE
const Storage = {
  set: (itemName, value) => {
    if (value !== null) localStorage.setItem(itemName, JSON.stringify(value))
  },

  get: itemName => {
    const item = JSON.parse(localStorage.getItem(itemName))
    if (item !== null) return item
  }
}

// ---------------------------------------------------------------------------
// PROGRAM
const App = {
  // ---------------------------------------------------------------------------
  // DATA
  nextId: Storage.get('nextId') || 1, // App.nextId
  data: Storage.get('data') || [], // App.data

  // ---------------------------------------------------------------------------
  // DISPLAY DATA
  // App.display()
  display: (data = App.data) => {
    taskListDOM.innerHTML = ''

    data.forEach(item => {
      const li = document.createElement('li')

      li.innerHTML = `<span>${item.text}</span>
      <button class="delete" onclick="App.remove(${item.id})">✖</button>
      `

      taskListDOM.appendChild(li)
    })
  },

  // ---------------------------------------------------------------------------
  // SUBMIT NEW DATA
  add: event => {
    event.preventDefault()

    const newTask = {
      id: App.nextId,
      text: document.getElementById('task-input').value,
      completed: false
    }

    if (newTask !== '') {
      // Push new data
      App.data.push(newTask)
      App.nextId++
      // Set new data into localStorage
      Storage.set('data', App.data)
      Storage.set('nextId', App.nextId)

      App.display()
      document.getElementById('task-input').value = ''
    }
  },

  // ---------------------------------------------------------------------------
  // REMOVE TASK BY ID
  remove: id => {
    const modifiedTasks = App.data.filter(item => {
      return item.id !== id
    })

    App.data = modifiedTasks
    Storage.set('data', App.data)
    App.display()
  },

  // ---------------------------------------------------------------------------
  // EDIT TASK TEXT
  edit: id => {
    const textInput = prompt('Edit task to...')

    if (textInput !== null) {
      const modifiedTasks = App.data.map(item => {
        if (item.id === id) {
          item.text = textInput
        }
        return item
      })

      App.data = modifiedTasks
      Storage.set('data', App.data)
      App.display()
    }
  },

  // ---------------------------------------------------------------------------
  // SEARCH TASK AFTER SUBMIT
  search: event => {
    event.preventDefault()
    const keyword = document.getElementById('search-text').value

    const foundTasks = App.data.filter(item => {
      return item.text.toLowerCase().includes(keyword.toLowerCase())
    })

    App.display(foundTasks)
  },

  // ---------------------------------------------------------------------------
  // SEARCH TASK AUTOMATICALLY
  searchAuto: () => {
    const keyword = document.getElementById('search-text').value

    const foundTasks = App.data.filter(item => {
      return item.text.toLowerCase().includes(keyword.toLowerCase())
    })

    App.display(foundTasks)
  },

  // ---------------------------------------------------------------------------
  // TOGGLE TASK COMPLETED
  toggleCompleted: id => {
    const modifiedTasks = App.data.map(item => {
      if (item.id === id) {
        item.completed = !item.completed
      }
      return item
    })

    App.data = modifiedTasks
    Storage.set('data', App.data)
    App.display()
  }
}

// ---------------------------------------------------------------------------
// RUN
App.display()
