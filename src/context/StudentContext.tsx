import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Student } from "../models/index.js";

interface StudentContextType {
  students: Student[];
  setStudents: (students: Student[]) => void;
}

interface StudentContextProviderProps {
  children: ReactNode;
}

const StudentContext = createContext<StudentContextType | null>(null);

export const StudentProvider = ({ children }: StudentContextProviderProps) => {
  const [students, setStudents] = useState<Student[]>([]);

  const value: StudentContextType = {
    students,
    setStudents
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = (): StudentContextType => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};
