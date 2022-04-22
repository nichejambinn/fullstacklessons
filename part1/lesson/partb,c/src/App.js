import { useState } from 'react'

// const Hello = ({ name, age }) => {
//   const bornYear = () => new Date().getFullYear() - age

//   return (
//     <div>
//       <h1>Hello {name}!</h1>
//       <h2>You are {age} years old</h2>
//       <h3>So you were probably born in {bornYear()}</h3>
//     </div>
//   )
// }

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ onClick, text }) => ( // notice these aren't curly braces !
    <button onClick={onClick}>
      {text}
    </button>
)

const App = () => {
  console.log('Hello from the App component')
  const now = new Date()
  // const [state, setState ] = useState(initialState)
  const [ counter, setCounter ] = useState(0) // initialize state with counter = 0

  // when setCounter is called React re-renders the component
  // if you combine timeout with click event handler you get fun behaviour 
  // as the different renders add additional timeout functions
  // setTimeout(
  //   () => setCounter(counter + 1), 
  //   1000
  // )

  console.log('rendering...', counter)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <>
      <p>It is {now.toString()}</p>
      <Display counter={counter} />
      {/* event handlers are functions
          the function call setCounter(...) re-renders the component
          so onClick={setCounter(...)} creates an infinite loop!
          generally we don't define event handlers in our JSX-templates anyway
       */}
      <Button onClick={increaseByOne} text="plus" />
      <Button onClick={setToZero} text="zero" />
      <Button onClick={decreaseByOne} text="minus" />
    </>
  )
}

export default App