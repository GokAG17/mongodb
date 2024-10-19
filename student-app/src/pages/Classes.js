import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Classes = () => {
  const [batches, setBatches] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    startYear: '',
    selectedSubjectId: ''
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenS, setModalOpenS] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [subjectData, setSubjectData] = useState({
    name: '',
    code: '',
    credits: '',
    teacher: ''
  });

  const fetchBatches = async () => {
    try {
      const batchResponse = await axios.get('http://localhost:3000/api/batches');
      setBatches(batchResponse.data);

      const subjectResponse = await axios.get('http://localhost:3000/api/subjects');
      setSubjects(subjectResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeS = (e) => {
    const { name, value } = e.target;
    setSubjectData({ ...subjectData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/batches', formData);
      fetchBatches();
      setFormData({ name: '', startYear: '', selectedSubjectId: '' });
    } catch (error) {
      console.error('Error creating batch:', error);
    }
  };

  const handleDeleteBatch = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/batches/${id}`);
      fetchBatches();
    } catch (error) {
      console.error('Error deleting batch:', error);
    }
  };

  const handleDeleteSubject = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/subjects/${id}`);
      fetchBatches(); // Refresh batches after deleting subject
    } catch (error) {
      console.error('Error deleting subject:', error);
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalOpenS = () => {
    setModalOpenS(true);
  };

  const handleModalCloseS = () => {
    setModalOpenS(false);
    setSubjectData({ name: '', code: '', credits: '', teacher: '' });
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedBatch(null);
    setSubjectData({ name: '', code: '', credits: '', teacher: '' });
  };

  const handleSubjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/subjects', subjectData);
      console.log('Subject created:', response.data); // Log successful response
      fetchBatches(); // Refresh subjects after creation
      setSubjectData({ name: '', code: '', credits: '', teacher: '' });
    } catch (error) {
      console.error('Error creating subject:', error.response.data); // Log error response
    }
  };

  const handleAssignSubject = async () => {
    const { selectedSubjectId } = formData;
    const { _id: batchId } = selectedBatch; // Extract batch _id from selectedBatch

    try {
      await axios.put(`http://localhost:3000/api/batches/${batchId}/assign`, {
        subjectId: selectedSubjectId
      });
      fetchBatches(); // Refresh batches after assigning subject
    } catch (error) {
      console.error('Error assigning subject to batch:', error);
    }
  };

  const handleBatchClick = (batch) => {
    setSelectedBatch(batch);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Batches</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <input
            type="text"
            name="name"
            placeholder="Batch Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 mb-2 md:mb-0 w-full md:w-auto"
          />
          <input
            type="number"
            name="startYear"
            placeholder="Start Year"
            value={formData.startYear}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-auto"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2 ml-0 md:ml-4 w-full md:w-auto"
          >
            Create Batch
          </button>
        </div>
      </form>

      {/* Batches List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {batches.map((batch) => (
          <div
            key={batch._id}
            className="border border-gray-300 rounded-md p-4 flex flex-col justify-between cursor-pointer"
            onClick={() => handleBatchClick(batch)}
          >
            <h3 className="text-lg font-semibold mb-2">{batch.name}</h3>
            <p className="text-gray-600 mb-2">Start Year: {batch.startYear}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteBatch(batch._id);
              }}
              className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 self-start"
            >
              Delete Batch
            </button>
          </div>
        ))}
      </div>

      {/* Subject Modal */}
      {selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-lg w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">{selectedBatch.name}</h2>
            <p className="text-gray-600 mb-4">Start Year: {selectedBatch.startYear}</p>
            <div className="bg-gray-100 p-4 rounded-md shadow-md">
              <strong className="block text-lg mb-2">Subjects:</strong>
              <ul>
                {selectedBatch.subjects.map((subjectId) => {
                  const subject = subjects.find((subj) => subj._id === subjectId);
                  return subject ? (
                    <li key={subject._id} className="text-blue-600 mb-1">
                      {subject.name}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSubject(subject._id);
                        }}
                        className="ml-2 text-red-500"
                      >
                        Delete
                      </button>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
            <form onSubmit={handleSubjectSubmit} className="mt-4">
              <select
                value={formData.selectedSubjectId}
                onChange={(e) => setFormData({ ...formData, selectedSubjectId: e.target.value })}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full"
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAssignSubject}
                className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 w-full"
              >
                Assign Subject
              </button>
            </form>
            <button
              onClick={handleModalClose}
              className="mt-4 bg-gray-300 text-gray-800 rounded-md px-4 py-2 hover:bg-gray-400 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Subjects Table */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Subjects List</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Code</th>
                <th className="px-4 py-2">Credits</th>
                <th className="px-4 py-2">Teacher</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject._id}>
                  <td className="border px-4 py-2">{subject.name}</td>
                  <td className="border px-4 py-2">{subject.code}</td>
                  <td className="border px-4 py-2">{subject.credits}</td>
                  <td className="border px-4 py-2">{subject.teacher}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDeleteSubject(subject._id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpenS && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Create New Subject</h2>
            <form onSubmit={handleSubjectSubmit} className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Subject Name"
                value={subjectData.name}
                onChange={handleChangeS}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2"
              />
              <input
                type="text"
                name="code"
                placeholder="Subject Code"
                value={subjectData.code}
                onChange={handleChangeS}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2"
              />
              <input
                type="number"
                name="credits"
                placeholder="Credits"
                value={subjectData.credits}
                onChange={handleChangeS}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2"
              />
              <input
                type="text"
                name="teacher"
                placeholder="Teacher"
                value={subjectData.teacher}
                onChange={handleChangeS}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                >
                  Create Subject
                </button>
                <button
                  onClick={handleModalCloseS}
                  className="ml-4 bg-gray-300 text-gray-800 rounded-md px-4 py-2 hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Button to Open Subject Creation Modal */}
      <button
        onClick={handleModalOpenS}
        className="fixed bottom-8 right-8 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600"
      >
        +
      </button>
    </div>
  );
};

export default Classes;
