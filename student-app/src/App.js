import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Students from './pages/Students';
import Classes from './pages/Classes';
import Navbar from './components/Navbar'; // Import Navbar component

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar /> {/* Include Navbar component */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/students" element={<Students />} />
          <Route exact path="/classes" element={<Classes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
