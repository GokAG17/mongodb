import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [batches, setBatches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudentData, setNewStudentData] = useState({
    name: '',
    rollNo: '',
    age: '',
    email: '',
    batch: ''
  });

  useEffect(() => {
    fetchStudents();
    fetchBatches();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/students');
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchBatches = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/batches');
      setBatches(res.data);
    } catch (error) {
      console.error('Error fetching batches:', error);
    }
  };

  const handleBatchChange = (batchId) => {
    setSelectedBatch(batchId);
    if (batchId) {
      fetchStudentsByBatch(batchId);
    } else {
      fetchStudents(); // Fetch all students if batchId is empty (All Batches selected)
    }
  };

  const fetchStudentsByBatch = async (batch) => {
    try {
      console.log(batch)
      const res = await axios.get(`http://localhost:3000/api/students/${batch}`);
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching students by batch:', error);
    }
  };

  const renderStudentsTable = () => {
    return (
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Roll No</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.rollNo}</td>
              <td className="border px-4 py-2">{student.age}</td>
              <td className="border px-4 py-2">{student.email}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(student._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(student._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleEdit = async (studentId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/students/${studentId}`);
      const { name, rollNo, age, email, batch } = response.data;
      setNewStudentData({ _id: studentId, name, rollNo, age, email, batch });
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching student for edit:', error);
    }
  };

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`http://localhost:3000/api/students/${studentId}`);
      fetchStudentsByBatch(selectedBatch);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleAddStudent = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/students', newStudentData);
      console.log('Student added successfully:', response.data);
      setShowModal(false);
      setNewStudentData({
        name: '',
        rollNo: '',
        age: '',
        email: '',
        batch: ''
      });
      fetchStudents();
      fetchStudentsByBatch(selectedBatch);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleUpdateStudent = async () => {
    try {
      const { _id, ...studentData } = newStudentData;
      const response = await axios.put(`http://localhost:3000/api/students/${_id}`, studentData);
      console.log('Student updated successfully:', response.data);
      setShowModal(false);
      setNewStudentData({
        name: '',
        rollNo: '',
        age: '',
        email: '',
        batch: ''
      });
      fetchStudentsByBatch(selectedBatch);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudentData({
      ...newStudentData,
      [name]: value
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Students Page</h2>

      {/* Batch selection */}
      <div className="mb-4">
        <label htmlFor="batch" className="mr-2 font-semibold">
          Select Batch:
        </label>
        <select
          id="batch"
          className="p-2 border rounded"
          onChange={(e) => handleBatchChange(e.target.value)}
          value={selectedBatch}
        >
          <option value="">All Batches</option>
          {batches.map((batch) => (
            <option key={batch.name} value={batch.name}>
              {batch.name}
            </option>
          ))}
        </select>
      </div>

      {/* Render students table */}
      {students.length > 0 ? (
        renderStudentsTable()
      ) : (
        <p className="text-gray-600">No students found.</p>
      )}

      {/* Add Student Button */}
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => {
          setNewStudentData({ name: '', rollNo: '', age: '', email: '', batch: selectedBatch });
          setShowModal(true);
        }}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Student
      </button>

      {/* Modal for adding/updating student */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-bold mb-4">{newStudentData._id ? 'Edit Student' : 'Add New Student'}</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newStudentData.name}
              onChange={handleInputChange}
              className="w-full p-2 border mb-4"
            />
            <input
              type="text"
              name="rollNo"
              placeholder="Roll No"
              value={newStudentData.rollNo}
              onChange={handleInputChange}
              className="w-full p-2 border mb-4"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={newStudentData.age}
              onChange={handleInputChange}
              className="w-full p-2 border mb-4"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newStudentData.email}
              onChange={handleInputChange}
              className="w-full p-2 border mb-4"
            />

            {/* Batch selection in modal */}
            <label htmlFor="batchModal" className="block mb-2">
              Assign to Batch:
            </label>
            <select
              id="batchModal"
              name="batch"
              className="w-full p-2 border mb-4"
              onChange={handleInputChange}
              value={newStudentData.batch}
            >
              <option value="">Select Batch</option>
              {batches.map((batch) => (
                <option key={batch._id} value={batch._id}>
                  {batch.name}
                </option>
              ))}
            </select>

            {/* Submit button */}
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={newStudentData._id ? handleUpdateStudent : handleAddStudent}
            >
              {newStudentData._id ? 'Update Student' : 'Add Student'}
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
