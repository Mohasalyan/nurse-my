// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import the Login page
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home route (you can add later) */}
        {/* <Route path="/" element={<Home />} /> */}

        {/* Login route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
