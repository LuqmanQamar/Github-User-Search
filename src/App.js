import './App.css';
import Home from './Components/Pages/Home-page/Home';
import User from './Components/Pages/User-Profile/Users';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/:login' element={<User />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
