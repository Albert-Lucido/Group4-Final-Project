const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Admin:QGdsIlvf48iFqSrJ@personal.zwsma.mongodb.net/EmployeeDatabase?retryWrites=true&w=majority&appName=Personal', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);
const registerRoutes = require('./routes/registerRoutes');
app.use('/api', registerRoutes);
const payslipRoutes = require('./routes/payslipRoutes');
app.use('/api', payslipRoutes);
const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api', employeeRoutes);
const timesheetRoutes = require('./routes/timesheetRoutes'); // Import timesheet routes
app.use('/api', timesheetRoutes);
const leaveRoutes = require('./routes/leaveRoutes');
app.use('/api', leaveRoutes);


