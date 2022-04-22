import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
    <App />,
    document.getElementById('root')
)

// some bad state
// let counter = 1

// const refresh = () => {
//   ReactDOM.render(
//     <App counter={counter} />, 
//     document.getElementById('root')
//   )
// }

// setInterval(() => {
//   refresh()
//   counter += 1
// }, 1000)