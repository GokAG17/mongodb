import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGraduate, faChalkboardTeacher, faChartLine, faBookOpen } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className="container mx-auto mt-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the College Student Management System!</h1>
        <p className="text-lg text-gray-700 mb-6">
          Manage students, classes, GPA calculations, and more with our comprehensive student management application.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/students"
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md"
          >
            <FontAwesomeIcon icon={faUserGraduate} className="text-xl mr-2" />
            View Students
          </Link>
          <Link
            to="/classes"
            className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md"
          >
            <FontAwesomeIcon icon={faChalkboardTeacher} className="text-xl mr-2" />
            View Classes
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Card 1: Manage Students */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FontAwesomeIcon icon={faUserGraduate} className="text-4xl text-blue-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Manage Students</h2>
          <p className="text-gray-700">
            Easily manage student records, GPA calculations, and performance tracking.
          </p>
        </div>

        {/* Card 2: Manage Classes */}
        {/* <div className="bg-white p-6 rounded-lg shadow-md">
          <FontAwesomeIcon icon={faChalkboardTeacher} className="text-4xl text-green-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Manage Classes</h2>
          <p className="text-gray-700">
            Organize classes, schedules, assignments, and student grading efficiently.
          </p>
        </div> */}

        {/* Card 3: Performance Tracking */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FontAwesomeIcon icon={faChartLine} className="text-4xl text-indigo-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Performance Tracking</h2>
          <p className="text-gray-700">
            Monitor student performance, analyze GPA trends, and generate performance reports.
          </p>
        </div>

        {/* Card 4: Student Details & Subjects */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FontAwesomeIcon icon={faBookOpen} className="text-4xl text-purple-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Student Details & Subjects</h2>
          <p className="text-gray-700">
            View detailed student profiles, including enrolled subjects, grades, and attendance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
