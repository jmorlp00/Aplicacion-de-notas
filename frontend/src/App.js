import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from './pages/SignIn.js'
import Notes from './pages/Notes.js'


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/:user/notes" element={<Notes/>}/>
      </Routes>
    </div>
    </Router>
    
  );
}

export default App;
