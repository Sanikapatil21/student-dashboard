import React, { createContext, useState, useEffect } from "react";

export const StudentContext = createContext();

// Provider Component
export const StudentProvider = ({ children }) => {
  //  Load students from localStorage 
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  const [editingIndex, setEditingIndex] = useState(null);

  // Save students to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = (student) => {
    if (editingIndex !== null) {
      const updated = [...students];
      updated[editingIndex] = student;
      setStudents(updated);
      setEditingIndex(null);
    } else {
      setStudents([...students, student]);
    }
  };

  const editStudent = (index) => setEditingIndex(index);

  // Delete student by index
  const deleteStudent = (index) => {
    const updated = [...students];
    updated.splice(index, 1); // remove 1 student at given index
    setStudents(updated);
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        editStudent,
        deleteStudent,
        editingIndex,
        setEditingIndex,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
