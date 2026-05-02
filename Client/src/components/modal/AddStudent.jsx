import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createStudent } from "../../store/slices/adminSlice";
import { toggleStudentModal } from "../../store/slices/popupSlice";
import { X } from "lucide-react";

const AddStudent = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "Computer Science",
    password: "",
  });

  const handleCreateStudent = (e) => {
    e.preventDefault();
    dispatch(createStudent(formData));
    setFormData({ name: "", email: "", department: "", password: "" });
    dispatch(toggleStudentModal());
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="card-title">Add Student</h3>
            <button
              onClick={() => dispatch(toggleStudentModal())}
              className="text-[#5a8a72] hover:text-[#c8f5e0]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleCreateStudent} className="space-y-4">
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

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => dispatch(toggleStudentModal())}
                className="btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStudent;
