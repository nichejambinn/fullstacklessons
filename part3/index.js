const express = require('express')
const app = express()

app.use(express.json()) // express json-parser

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true  
  },
  {    
    id: 2,    
    content: "Browser can execute only Javascript",    
    date: "2022-05-30T18:39:34.091Z",    
    important: false  
  },  
  {    
    id: 3,    
    content: "GET and POST are the most important methods of HTTP protocol",    
    date: "2022-05-30T19:20:14.298Z",    
    important: true  
  }
]

// const app = http.createServer((request, response) => {  
//   response.writeHead(200, { 'Content-Type': 'application/json' })  
//   response.end(JSON.stringify(notes))
// })

app.get('/', (request, response) => {
  response.send('<h1>Hello world!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id) // url params are strings
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    //response.statusMessage = "No note with that id"
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

const generateId = () => {
  // need a unique id - not the best approach!
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id)) // spread syntax ... passes the array values as individual parameters to the function, ie. Math.max(1, 2, 3) vs Math.max([1, 2, 3])
    : 0
  
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body // without the json-parser, the body property would be undefined

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(), // best to do this server side - we don't know how the browser clock is set
    id: generateId()
  }

  //console.log(request.get('Content-Type')) 
  //console.log(note)
  notes = notes.concat(note)

  response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
