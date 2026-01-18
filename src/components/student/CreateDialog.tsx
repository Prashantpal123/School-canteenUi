import { useState } from "react";
import { createStudent as createStudentApi } from "../../api/canteenApi.js";
import type { Student, CreateStudentData } from "../../models/index.js";

interface CreateStudentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStudentCreated: (student: Student) => void;
}

const CreateStudentDialog = ({ isOpen, onClose, onStudentCreated }: CreateStudentDialogProps) => {
  const [newStudentName, setNewStudentName] = useState("");
  const [creatingStudent, setCreatingStudent] = useState(false);

  const handleCreateStudent = async () => {
    if (!newStudentName.trim()) {
      alert("Please enter student name");
      return;
    }

    setCreatingStudent(true);
    try {
      const studentData: CreateStudentData = {
        name: newStudentName.trim(),
      };

      const newStudent = await createStudentApi(studentData);
      onStudentCreated(newStudent);
      setNewStudentName("");
      onClose();
      alert("Student created successfully!");
    } catch (error) {
      console.error("Error creating student:", error);
      alert("Error creating student. Please try again.");
    } finally {
      setCreatingStudent(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-20 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-96 max-w-sm">
        {/* Header */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Create New Student
        </h2>

        {/* Student Name Input */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Student Name *
          </label>
          <input
            type="text"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            placeholder="Enter student name"
            className="w-full border border-gray-300 rounded-lg py-2 px-3 font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCreateStudent();
              }
            }}
          />
        </div>

        {/* Referral Code Info */}
        <div className="bg-green-50 rounded-lg p-3 mb-6 border border-green-200">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Referral Code:</span> Auto-generated on creation
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              onClose();
              setNewStudentName("");
            }}
            disabled={creatingStudent}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateStudent}
            disabled={creatingStudent || !newStudentName.trim()}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creatingStudent ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStudentDialog;