import './App.css';
import './Firebase/firebase';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CreateUserScreen from './createUserScreen';
import LoginScreen from './loginScreen';
import Queridometro from './queridometro';
import Result from './result';

function Home() {
  return <div className='register-box'>
      <label>Queridômetro</label>
        <button className="confirm-queridometro">
          <Link style={{textDecoration: 'none'}} to="/create-user">Create User</Link>
        </button>
        <button className="confirm-queridometro">
          <Link style={{textDecoration: 'none'}} to="/login">Login</Link>
        </button>
    </div>
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/queridometro" element={<Queridometro/>}/>
        <Route path="/queridometro/result" element={<Result />}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginScreen/>}/>
        <Route path="/create-user" element={<CreateUserScreen/>} />
      </Routes>
    </Router>
  );
}

export default App;

