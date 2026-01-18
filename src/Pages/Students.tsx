import { useEffect, useState } from "react";
import { getStudents } from "../api/canteenApi.js";
import { useStudent } from "../context/StudentContext.js";
import type { Student } from "../models/index.js";
import {
  StudentTable,
  CreateStudentDialog,
  StudentsSummary,
} from "../components/student/index.js";

const Students = () => {
  const { students, setStudents } = useStudent();
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const tableHeaders = [
    { label: "Student Name", align: "left" },
    { label: "Referral Code", align: "left" },
    { label: "Total Spent", align: "right" },
    { label: "Action", align: "right" },
  ];

  useEffect(() => {
    setLoading(true);
    getStudents().then((data: Student[]) => {
      setStudents(data);
      setLoading(false);
    });
  }, []);

  const handleStudentCreated = (newStudent: Student) => {
    setStudents([...students, newStudent]);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
        {/* Header */}
        <div className="mb-4 md:mb-8 flex flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className=" text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Student Directory
            </h1>
            <p className="text-lg text-gray-600">
              View all registered students and their details
            </p>
          </div>
          <button
            onClick={() => setShowCreateDialog(true)}
            className="md:mt-4 sm:mt-0 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 md:py-2  px-3 md:px-6 rounded-lg transition transform hover:scale-105 flex items-center space-x-2 shadow-lg"
          >
            <span >Create </span>
          </button>
        </div>

        {/* Student Table */}
        <StudentTable
          students={students}
          loading={loading}
          tableHeaders={tableHeaders}
        />

        {/* Summary Section */}
        <StudentsSummary students={students} />

        {/* Create Student Dialog */}
        <CreateStudentDialog
          isOpen={showCreateDialog}
          onClose={() => setShowCreateDialog(false)}
          onStudentCreated={handleStudentCreated}
        />
      </div>
    </div>
  );
};

export default Students;