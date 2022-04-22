const Hello = (props) => {
  return (
    <div>
      <h1>Hello {props.name}!</h1>
      <h2>You are {props.age} years old</h2>
    </div>
  )
}

const App = () => {
  console.log('Hello from the App component')

  const now = new Date()
  const a = 10
  const b = 20

  const name = "Lilla"
  const age = 28

  return (
    <>
      <Hello name="Ben" age={28+4} />
      <Hello name={name} age={age} />
      <p>It is {now.toString()}</p>
      <p>
        {a} plus {b} is {a+b}
      </p>
    </>
  )
}

export default App