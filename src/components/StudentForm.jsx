import React, { useContext, useEffect, useState } from "react";
import { StudentContext } from "../context/StudentContext";

export default function StudentForm({ courses }) {
  const { addStudent, students, editingIndex } = useContext(StudentContext);
  const [form, setForm] = useState({ name: "", email: "", course: "", image: "" });
  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (editingIndex !== null) {
      setForm(students[editingIndex]);
    }
  }, [editingIndex, students]);

  // Validation
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address";
    }
    if (!form.course) errs.course = "Please select a course";
    if (!form.image.trim()) errs.image = "Profile image URL is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addStudent(form);
    setForm({ name: "", email: "", course: "", image: "" });
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>{editingIndex !== null ? "Edit Student" : "Add New Student"}</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      {errors.name && <span className="error">{errors.name}</span>}

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <select name="course" value={form.course} onChange={handleChange}>
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      {errors.course && <span className="error">{errors.course}</span>}

      <input
        name="image"
        placeholder="Profile Image URL"
        value={form.image}
        onChange={handleChange}
      />
      {errors.image && <span className="error">{errors.image}</span>}

      <button type="submit">
        {editingIndex !== null ? "Update" : "Add"}
      </button>
    </form>
  );
}
