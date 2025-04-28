// // src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';

// // Import the Login page
// import Login from './pages/Login';
// import HomePage from './pages/HomePage'; // Assuming you have a HomePage component
// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Home route (you can add later) */}
//         {/* <Route path="/" element={<Home />} /> */}

//         {/* Login route */}
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// src/App.jsx
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
