import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Danh sách môn học được sắp xếp theo mã môn học (alpha)
const availableSubjects = [
  { code: 'IT001', name: 'Nhập môn lập trình' },
  { code: 'MA006', name: 'Giải tích' },
  { code: 'MA003', name: 'Đại số tuyến tính' },
  { code: 'PH001', name: 'Nhập môn điện tử' },
  { code: 'IT009', name: 'Giới thiệu ngành' },
  { code: 'EN004', name: 'Anh văn 1' },
  { code: 'PE001', name: 'Giáo dục thể chất 1' },
  { code: 'ME001', name: 'Giáo dục quốc phòng' },
  { code: 'IT002', name: 'Lập trình hướng đối tượng' },
  { code: 'IT003', name: 'Cấu trúc dữ liệu và giải thuật' },
  { code: 'PH002', name: 'Nhập môn mạch số' },
  { code: 'MA004', name: 'Cấu trúc rời rạc' },
  { code: 'MA005', name: 'Xác suất thống kê' },
  { code: 'EN005', name: 'Anh văn 2' },
  { code: 'PE002', name: 'Giáo dục thể chất 2' },
  { code: 'IT004', name: 'Cơ sở dữ liệu' },
  { code: 'IT005', name: 'Nhập môn mạng máy tính' },
  { code: 'IT006', name: 'Kiến trúc máy tính' },
  { code: 'SS004', name: 'Kỹ năng nghề nghiệp' },
  { code: 'EN006', name: 'Anh văn 3' },
  { code: 'NT132', name: 'Quản trị mạng và hệ thống' },
  { code: 'NT106', name: 'Lập trình mạng căn bản' },
  { code: 'IT007', name: 'Hệ điều hành' },
  { code: 'SS001', name: 'Những nguyên lý cơ bản của chủ nghĩa Mác Lênin' },
  { code: 'NT105', name: 'Truyền dữ liệu' },
  { code: 'NT101', name: 'An toàn mạng máy tính' },
  { code: 'NT131', name: 'Hệ thống nhúng mạng không dây' },
  { code: 'NT118', name: 'Phát triển ứng dụng trên thiết bị di động' },
  { code: 'NT113', name: 'Thiết kế mạng' },
  { code: 'SS002', name: 'Đường lối cách mạng của Đảng CSVN' },
  { code: 'NT114', name: 'Đồ án chuyên ngành' },
  { code: 'SS003', name: 'Tư tưởng Hồ Chí Minh' },
  { code: 'NT215', name: 'Thực tập doanh nghiệp' },
  { code: 'SS006', name: 'Pháp luật đại cương' },
  { code: 'SS008', name: 'Kinh tế chính trị Mác-Lênin' },
  { code: 'SS010', name: 'Lịch sử Đảng Cộng sản Việt Nam' },
];

// Sắp xếp các môn học theo mã môn học
const sortedSubjects = availableSubjects.sort((a, b) => a.code.localeCompare(b.code));

const StudentPointsPage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [subjectName, setSubjectName] = useState('');
  const [subjectScore, setSubjectScore] = useState('');
  const [loading, setLoading] = useState(false);
  // const [subjectToUpdate, setSubjectToUpdate] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudent(id);
  }, [id]);

  const fetchStudent = async (studentId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/students/${studentId}`);
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching student:', error);
      toast.error('Error fetching student!');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubject = async () => {
    if (!subjectName || subjectScore <= 0 || subjectScore > 10) {
      toast.error('Please provide a valid subject name and score (0-10)!');
      return;
    }

    const subjectData = { name: subjectName, score: parseFloat(subjectScore) };
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/students/${id}/subjects`, subjectData);
      toast.success('Subject added successfully!');
      setStudent(response.data);
      setSubjectName('');
      setSubjectScore('');
    } catch (error) {
      console.error('Error adding subject:', error);
      toast.error('Error adding subject!');
    }
  };

  const handleRemoveSubject = async (subjectName) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/students/${id}/subjects/${subjectName}`);
      toast.success('Subject removed successfully!');
      setStudent(response.data);
    } catch (error) {
      console.error('Error removing subject:', error);
      toast.error('Error removing subject!');
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <button
        onClick={handleBackClick}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '5px 10px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Back to Student List
      </button>

      <h1>Student: {student ? student.name : ''}</h1>

      {loading && <div>Loading student data...</div>}

      {student && !loading && (
        <div>
          <h3>Add New Subject</h3>
          <select
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            style={{ marginBottom: '10px', padding: '5px' }}
          >
            <option value="">Select Subject</option>
            {sortedSubjects.map((subject) => (
              <option key={subject.code} value={subject.name}>
                {subject.code}: {subject.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Subject Score (0-10)"
            value={subjectScore}
            onChange={(e) => setSubjectScore(e.target.value)}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
          <button
            onClick={handleAddSubject}
            style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
          >
            Add Subject
          </button>

          <h3 style={{ marginTop: '20px' }}>Subjects</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Subject</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Score</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {student.subjects && student.subjects.length > 0 ? (
                student.subjects.map((subject, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {subject.name}
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      {subject.score}
                    </td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                      <button
                        onClick={() => handleRemoveSubject(subject.name)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '8px' }}>
                    No subjects available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!student && !loading && <div>Student not found.</div>}
    </div>
  );
};

export default StudentPointsPage;
