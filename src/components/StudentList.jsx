import React, { useContext } from "react";
import { StudentContext } from "../context/StudentContext.jsx";

export default function StudentList({ search, selectedCourse }) {
  const { students, editStudent, deleteStudent } = useContext(StudentContext);

  //  search and filter
  const filteredStudents = students.filter((s) => {
    const matchesName = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesCourse =
      selectedCourse === "" || s.course === selectedCourse;
    return matchesName && matchesCourse;
  });

  if (filteredStudents.length === 0)
    return <p>No students match your search/filter.</p>;

  return (
    <div className="student-list">
      {filteredStudents.map((s, i) => (
        <div key={i} className="student-card">
          <img src={s.image} alt={s.name} />
          <h3>{s.name}</h3>
          <p>{s.email}</p>
          <p>📖 {s.course}</p>
          <button onClick={() => editStudent(i)}>Edit</button>
          <button
            onClick={() => deleteStudent(i)}
            style={{ background: "red", marginLeft: "5px", color: "white" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
