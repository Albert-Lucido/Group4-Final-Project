import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Validation schema using Yup
const schema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  gender: Yup.string().required("Gender is required"),
  maritalStatus: Yup.string().required("Marital Status is required"),
  nationality: Yup.string().required("Nationality is required"),
  address: Yup.string().required("Address is required"),
  contactNumber: Yup.string()
    .required("Contact Number is required")
    .matches(/^[0-9]{11}$/, "Contact Number must be 11 digits"),
  validID: Yup.string().required("Valid ID is required"),
  idNumber: Yup.string().required("ID Number is required"),
  bankName: Yup.string().required("Bank Name is required"),
  bankAccountNumber: Yup.string().required("Bank Account Number is required"),
  employmentType: Yup.string().required("Employment Type is required"),
  department: Yup.string().required("Department is required"),
  position: Yup.string().required("Position/Designation is required"),
  joiningDate: Yup.date().required("Joining Date is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  profilePhoto: Yup.mixed().required("Profile Photo is required"),
});

function PersonalInfo() {
  const [notification, setNotification] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert("Personnel information updated!");
    console.log(data);

    setNotification("Your personnel information has been successfully updated.");
    reset();
  };

  return (
    <div className="personal-info">
      <h3>Update Personnel Information</h3>
      <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "left", width: "70%" }}>
        <div className="input-wrapper">
          <label>Personnel ID (Read-only)</label>
          <input type="text" value="123456" readOnly />
        </div>

        {/* First Name */}
        <div className={`input-wrapper ${errors.firstName ? 'error' : ''}`}>
          <label>First Name</label>
          <input type="text" {...register("firstName")} />
          {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
        </div>

        {/* Last Name */}
        <div className={`input-wrapper ${errors.lastName ? 'error' : ''}`}>
          <label>Last Name</label>
          <input type="text" {...register("lastName")} />
          {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
        </div>

        {/* Gender */}
        <div className={`input-wrapper ${errors.gender ? 'error' : ''}`}>
          <label>Gender</label>
          <select {...register("gender")}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <p className="error-message">{errors.gender.message}</p>}
        </div>

        {/* Marital Status */}
        <div className={`input-wrapper ${errors.maritalStatus ? 'error' : ''}`}>
          <label>Marital Status</label>
          <select {...register("maritalStatus")}>
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Widowed">Widowed</option>
            <option value="Divorced">Divorced</option>
          </select>
          {errors.maritalStatus && <p className="error-message">{errors.maritalStatus.message}</p>}
        </div>

        {/* Nationality */}
        <div className={`input-wrapper ${errors.nationality ? 'error' : ''}`}>
          <label>Nationality</label>
          <input type="text" {...register("nationality")} />
          {errors.nationality && <p className="error-message">{errors.nationality.message}</p>}
        </div>

        {/* Address */}
        <div className={`input-wrapper ${errors.address ? 'error' : ''}`}>
          <label>Address</label>
          <input type="text" {...register("address")} />
          {errors.address && <p className="error-message">{errors.address.message}</p>}
        </div>

        {/* Contact Number */}
        <div className={`input-wrapper ${errors.contactNumber ? 'error' : ''}`}>
          <label>Contact Number</label>
          <input type="text" {...register("contactNumber")} />
          {errors.contactNumber && <p className="error-message">{errors.contactNumber.message}</p>}
        </div>

        {/* Valid ID */}
        <div className={`input-wrapper ${errors.validID ? 'error' : ''}`}>
          <label>Valid ID</label>
          <input type="text" {...register("validID")} />
          {errors.validID && <p className="error-message">{errors.validID.message}</p>}
        </div>

        {/* ID Number */}
        <div className={`input-wrapper ${errors.idNumber ? 'error' : ''}`}>
          <label>ID Number</label>
          <input type="text" {...register("idNumber")} />
          {errors.idNumber && <p className="error-message">{errors.idNumber.message}</p>}
        </div>

        {/* Bank Name */}
        <div className={`input-wrapper ${errors.bankName ? 'error' : ''}`}>
          <label>Bank Name</label>
          <input type="text" {...register("bankName")} />
          {errors.bankName && <p className="error-message">{errors.bankName.message}</p>}
        </div>

        {/* Bank Account Number */}
        <div className={`input-wrapper ${errors.bankAccountNumber ? 'error' : ''}`}>
          <label>Bank Account Number</label>
          <input type="text" {...register("bankAccountNumber")} />
          {errors.bankAccountNumber && <p className="error-message">{errors.bankAccountNumber.message}</p>}
        </div>

        {/* Employment Type */}
        <div className={`input-wrapper ${errors.employmentType ? 'error' : ''}`}>
          <label>Employment Type</label>
          <select {...register("employmentType")}>
            <option value="">Select</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Intern">Intern</option>
            <option value="Holiday Worker">Holiday Worker</option>
          </select>
          {errors.employmentType && <p className="error-message">{errors.employmentType.message}</p>}
        </div>

        {/* Department */}
        <div className={`input-wrapper ${errors.department ? 'error' : ''}`}>
          <label>Department</label>
          <input type="text" {...register("department")} />
          {errors.department && <p className="error-message">{errors.department.message}</p>}
        </div>

        {/* Position */}
        <div className={`input-wrapper ${errors.position ? 'error' : ''}`}>
          <label>Position/Designation</label>
          <input type="text" {...register("position")} />
          {errors.position && <p className="error-message">{errors.position.message}</p>}
        </div>

        {/* Joining Date */}
        <div className={`input-wrapper ${errors.joiningDate ? 'error' : ''}`}>
          <label>Joining Date</label>
          <input type="date" {...register("joiningDate")} />
          {errors.joiningDate && <p className="error-message">{errors.joiningDate.message}</p>}
        </div>

        {/* Profile Photo */}
        <div className={`input-wrapper ${errors.profilePhoto ? 'error' : ''}`}>
          <label>Profile Photo</label>
          <input type="file" {...register("profilePhoto")} />
          {errors.profilePhoto && <p className="error-message">{errors.profilePhoto.message}</p>}
        </div>

        {/* Password */}
        <div className={`input-wrapper ${errors.password ? 'error' : ''}`}>
          <label>Password</label>
          <input type="password" {...register("password")} />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <button type="submit">Update</button>
      </form>

      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}

export default PersonalInfo;
