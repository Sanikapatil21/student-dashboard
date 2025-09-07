import React, { useEffect, useState, useMemo, useContext } from "react";
import StudentForm from "./components/StudentForm.jsx";
import StudentList from "./components/StudentList.jsx";
import Loader from "./components/Loader.jsx";
import { StudentProvider, StudentContext } from "./context/StudentContext.jsx";
import "./App.css";

function Dashboard() {
  const { students } = useContext(StudentContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  //  States for search & filter
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  //  Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  //  MockAPI endpoint for courses
  const API_URL = "https://68bc743e0f2491613edefbaa.mockapi.io/courses";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
      }
    };
    setTimeout(fetchCourses, 1000);
  }, []);

  
  const studentCount = useMemo(() => students.length, [students]);

  if (loading) return <Loader />;

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      {/* 🌙 Dark Mode Toggle */}
      <button
        className="dark-toggle"
        onClick={() => setDarkMode((prev) => !prev)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1>📘 Student Management Dashboard</h1>
      <p>Total Students: {studentCount}</p>

      {/* 🔍 Search and Filter Controls */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">All Courses</option>
          {courses.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add new student */}
      <StudentForm courses={courses} />

      {/* List students with search & filter */}
      <StudentList search={search} selectedCourse={selectedCourse} />
    </div>
  );
}

export default function App() {
  return (
    <StudentProvider>
      <Dashboard />
    </StudentProvider>
  );
}
