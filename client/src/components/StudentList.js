import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Thay useHistory bằng useNavigate
// import { Link } from 'react-router-dom';
import StudentForm from './StudentForm';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const navigate = useNavigate(); // Dùng useNavigate để điều hướng trang

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/students`);
      const sortedStudents = response.data.sort((a, b) => a.id - b.id);
      setStudents(sortedStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Error fetching students!');
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/students/${id}`);
      fetchStudents();
      toast.success(`Deleted Student ${id}!`);
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Error deleting student!');
    }
  };

  const editStudent = (student) => {
    setEditingStudent(student);
  };

  const handleFormSubmit = () => {
    setEditingStudent(null);
    fetchStudents();
    toast.success(editingStudent ? 'Updated student successfully!' : 'Added a student successfully!');
  };

  const filteredStudents = students.filter(student => {
    const studentId = student.id ? student.id.toString() : '';
    const idMatches = studentId.startsWith(searchTerm);
    const majorMatches = selectedMajor ? student.major === selectedMajor : true;
    return idMatches && majorMatches;
  });

  // Chuyển hướng đến trang nhập điểm
  const handlePointClick = (studentId) => {
    navigate(`/students/${studentId}/points`); // Sử dụng navigate để chuyển hướng
  };

  return (
    <div>
      <h1>Student Management</h1>
      <StudentForm student={editingStudent} onSubmit={handleFormSubmit} />
      <input
        type="text"
        placeholder="Search by ID (starts with)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ margin: '5px', padding: '5px' }}
      />
      <select
        value={selectedMajor}
        onChange={(e) => setSelectedMajor(e.target.value)}
        style={{ margin: '5px', padding: '5px' }}
      >
        <option value="">Select Major</option>
        <option value="MMTT">MMTT</option>
        <option value="ATTT">ATTT</option>
        <option value="ATTN">ATTN</option>
        <option value="KHMT">KHMT</option>
        <option value="KHTN">KHTN</option>
      </select>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Major</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>GPA</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.major}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.GPA}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <button
                  onClick={() => editStudent(student)}
                  style={{
                    marginRight: '10px',
                    padding: '5px 10px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteStudent(student.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545', // Màu đỏ cho Delete
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>

                {/* Nút "Point" để chuyển đến trang nhập điểm */}
                <button
                  onClick={() => handlePointClick(student.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#007bff', // Màu xanh cho "Point"
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Point
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
