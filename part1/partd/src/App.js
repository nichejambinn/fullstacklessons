import { useState } from 'react'

const Button = ({ handleClick, text }) => ( // notice these aren't curly braces !
    <button onClick={handleClick}>
      {text}
    </button>
)

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Display = props => <div>{props.value}</div>

const App = () => {
  // storing this simple state in a complex structure is silly
  // const [clicks, setClicks] = useState({
  //   left: 0,
  //   right: 0
  // })

  // const handleLeftClick = () => 
  //   setClicks({...clicks, left: clicks.left + 1})

  // const handleRightClick = () => 
  //   setClicks({...clicks, right: clicks.right + 1})

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  // it is *forbidden* in React to mutate state directly
  // always set the state to a new object when changing it
  // thus concat instead of push for the allClicks array

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)  
  }

  const reset = () => {
    setAll([])
    setLeft(0)
    setRight(0)
  }

  // // don't define components inside other components
  // const Display = props => <div>{props.value}</div> // bad!

  const [value, setValue] = useState(10)
  
  const setToValue = (newValue) => () => {   
    console.log('value now', newValue)  // print the new value to console    
    setValue(newValue)  
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text="left" />
      <Button handleClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks} />
      <Button handleClick={reset} text="reset" />
      <br />
      <Display value={value} />
      <button onClick={setToValue(1000)}>thousand</button>      
      <button onClick={setToValue(0)}>zero</button>      
      <button onClick={setToValue(value + 1)}>increment</button>
    </div>
  )
}

export default App

// // illustrates rules for using hooks
// const App = () => {
//   // these are ok
//   const [age, setAge] = useState(0)
//   const [name, setName] = useState('Juha Tauriainen')

//   if ( age > 10 ) {
//     // this does not work!
//     const [foobar, setFoobar] = useState(null)
//   }

//   for ( let i = 0; i < age; i++ ) {
//     // also this is not good
//     const [rightWay, setRightWay] = useState(false)
//   }

//   const notGood = () => {
//     // and this is also illegal
//     const [x, setX] = useState(-1000)
//   }

//   return (
//     <></>
//     //...
//   )
// }