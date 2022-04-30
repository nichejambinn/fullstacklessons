import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Note from './components/Note'

// npx json-server --port 3001 --watch db.json

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    noteService // if we called this directly in the component the setNotes call would cause an infinite rerender loop
      .getAll()
      .then(initialNotes => {
        console.log('got all notes')
        setNotes(initialNotes)
    })
  }, []) // array of params specify when to run effect - empty == 1x only

  console.log('render', notes.length, 'notes')
  
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  // we will pass a unique event handler to each note based on the id
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id) // reference to a state item - do not change directly!
    const changedNote = { ...note, important: !note.important } // shallow copy

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        console.log(`importance of ${id} toggled`)
        setNotes(notes.map(note => note.id !== id ? note : returnedNote)) // map creates a new array
    })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>   
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)} 
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App