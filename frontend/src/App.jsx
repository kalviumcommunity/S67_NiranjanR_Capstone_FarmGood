import {Routes,Route} from 'react-router-dom'
import Login from './pages/login'
import Homepage from './pages/Homepage'

function App() {

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Homepage />}></Route>
    </Routes>
    </>
  )
}

export default App
