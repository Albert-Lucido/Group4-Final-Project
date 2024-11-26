import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Validation schema using Yup
const schema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{11}$/, "Phone number must be 11 digits"),
  address: Yup.string().required("Address is required"),
});

function PersonalInfo() {
  const [notification, setNotification] = useState("");  // For storing notification message
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    alert("Personal information updated!");
    console.log(data);

    // Set the notification
    setNotification("Your personal information has been successfully updated.");

    // Reset form fields
    reset();
  };

  return (
    <div className="personal-info">
      <h3>Update Personal Information</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Wrapper for First Name */}
        <div className={`input-wrapper ${errors.firstName ? 'error' : ''}`}>
          <label>First Name</label>
          <input type="text" {...register("firstName")} />
          {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
        </div>

        {/* Wrapper for Last Name */}
        <div className={`input-wrapper ${errors.lastName ? 'error' : ''}`}>
          <label>Last Name</label>
          <input type="text" {...register("lastName")} />
          {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
        </div>

        {/* Wrapper for Phone Number */}
        <div className={`input-wrapper ${errors.phoneNumber ? 'error' : ''}`}>
          <label>Phone Number</label>
          <input type="text" {...register("phoneNumber")} />
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber.message}</p>}
        </div>

        {/* Wrapper for Address */}
        <div className={`input-wrapper ${errors.address ? 'error' : ''}`}>
          <label>Address</label>
          <input type="text" {...register("address")} />
          {errors.address && <p className="error-message">{errors.address.message}</p>}
        </div>

        <button type="submit">Update</button>
      </form>

      {/* Show Notification */}
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}

export default PersonalInfo;
