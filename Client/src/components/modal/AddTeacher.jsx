import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createStudent, createTeacher } from "../../store/slices/adminSlice";
import {
  toggleStudentModal,
  toggleTeacherModal,
} from "../../store/slices/popupSlice";
import { X } from "lucide-react";

const AddTeacher = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "Computer Science",
    password: "",
    experties: "Artificial Intelligence",
    maxStudents: 1,
  });

  const handleCreateTeacher = (e) => {
    e.preventDefault();
    dispatch(createTeacher(formData));
    setFormData({
      name: "",
      email: "",
      department: "",
      password: "",
      experties: "",
      maxStudents: 1,
    });
    dispatch(toggleTeacherModal());
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="card-title">Add Teacher</h3>
            <button
              onClick={() => dispatch(toggleTeacherModal())}
              className="text-[#5a8a72] hover:text-[#c8f5e0]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleCreateTeacher} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input w-full"
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input w-full"
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="input w-full"
              />
            </div>
            <div>
              <label className="label">Department</label>
              <select
                className="input w-full"
                required
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Data Science">Data Science</option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Business Administration">
                  Business Administration
                </option>
                <option value="Economics">Economics</option>
                <option value="Psychology">Psychology</option>
              </select>
            </div>

            <div>
              <label className="label">Expertise</label>
              <select
                className="input w-full"
                required
                value={formData.experties}
                onChange={(e) =>
                  setFormData({ ...formData, experties: e.target.value })
                }
              >
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Data Science">Data Science</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Database Systems">Database Systems</option>
                <option value="Computer Networks">Computer Networks</option>
                <option value="Operating Systems">Operating Systems</option>
                <option value="Human-Computer Interaction">
                  Human-Computer Interaction
                </option>
                <option value="Big Data Analytics">Big Data Analytics</option>
                <option value="Blockchain Technology">
                  Blockchain Technology
                </option>
                <option value="Internet of Things (IoT)">
                  Internet of Things (IoT)
                </option>
              </select>
            </div>

            <div>
              <label className="label">Max Students</label>
              <input
                type="number"
                required
                max={10}
                min={1}
                value={formData.maxStudents}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxStudents: e.target.value,
                  })
                }
                className="input w-full"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => dispatch(toggleTeacherModal())}
                className="btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Add Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTeacher;
