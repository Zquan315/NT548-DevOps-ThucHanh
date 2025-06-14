import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Cập nhật import
import StudentList from './components/StudentList';
import StudentPointsPage from './components/StudentPointsPage'; // Import trang nhập điểm
import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Thay Switch bằng Routes */}
          <Route path="/" element={<StudentList />} /> {/* Thay component bằng element */}
          <Route path="/students/:id/points" element={<StudentPointsPage />} /> {/* Cập nhật cách truyền element */}
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
