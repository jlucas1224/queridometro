import './App.css';
import './Firebase/firebase';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CreateUserScreen from './createUserScreen';
import LoginScreen from './loginScreen';
import Queridometro from './queridometro';
import Result from './result';
import { useEffect } from 'react';
import { validateDay } from './Firebase/firebase';

function Home() {
  return <div className='register-box'>
      <label>Queridômetro</label>
        <button className="confirm-queridometro">
          <Link style={{textDecoration: 'none'}} to="/queridometro/create-user">Create User</Link>
        </button>
        <button className="confirm-queridometro">
          <Link style={{textDecoration: 'none'}} to="/queridometro/login">Login</Link>
        </button>
    </div>
}

function App() {
  useEffect(() => {
    validateDay()
  })

  return (
    <Router>
      <Routes>
        <Route path="/queridometro/vote" element={<Queridometro/>}/>
        <Route path="/queridometro/result" element={<Result />}/>
        <Route path="/queridometro" element={<Home/>}/>
        <Route path="/queridometro/login" element={<LoginScreen/>}/>
        <Route path="/queridometro/create-user" element={<CreateUserScreen/>} />
      </Routes>
    </Router>
  );
}

export default App;

