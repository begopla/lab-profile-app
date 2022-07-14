
import './App.css';
import { Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
function App() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/api/auth/signup' element={<Signup />}/>
        <Route path='/api/auth/login' element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;
