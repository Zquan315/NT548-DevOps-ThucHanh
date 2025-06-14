import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentForm = ({ student, onSubmit }) => {
  const [formData, setFormData] = useState({ id: '', name: '', major: '' });

  useEffect(() => {
    if (student) {
      setFormData({ id: student.id, name: student.name, major: student.major });
    } else {
      setFormData({ id: '', name: '', major: '' });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu major trống khi thêm sinh viên mới
    if (!formData.major) {
      alert('Chuyên ngành là bắt buộc!');
      return;
    }

    try {
      if (student) {
        // Cập nhật sinh viên đã tồn tại
        await axios.patch(`${process.env.REACT_APP_API_URL}/students/${formData.id}`, {
          name: formData.name,
          major: formData.major,
        });
      } else {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/students`);
        const students = response.data;
        const isDuplicate = students.some(existingStudent => existingStudent.id === formData.id);

        if (isDuplicate) {
          alert('ID đã tồn tại. Vui lòng chọn ID khác!');
          return;
        } else {
          await axios.post(`${process.env.REACT_APP_API_URL}/students`, {
            id: formData.id,
            name: formData.name,
            major: formData.major, 
            GPA: 0, 
          });
        }
      }

      setFormData({ id: '', name: '', major: '' });
      onSubmit();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="ID"
        required
        disabled={!!student}
        style={{ margin: '5px', padding: '5px' }}
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        style={{ margin: '5px', padding: '5px' }}
      />
      <select
        name="major"
        value={formData.major}
        onChange={handleChange}
        required
        style={{ margin: '5px', padding: '5px'}}
      >
        <option value="">Select Major</option>
        <option value="MMTT">MMTT</option>
        <option value="ATTT">ATTT</option>
        <option value="ATTN">ATTN</option>
        <option value="KHMT">KHMT</option>
        <option value="KHTN">KHTN</option>
      </select> 
      <button type="submit" style={{ margin: '5px', padding: '5px 10px' }}>
        {student ? 'Update' : 'Add'} student
      </button>
    </form>
  );
};

export default StudentForm;
