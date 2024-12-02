import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeWrap from './employee/EmployeeWrap';
import Login from './login/Login';
import AdminWrap from './admin/AdminWrap';
import Register from './login/Register';
import ManagerWrap from './manager/ManagerWrap';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={<AdminWrap />} />
        <Route path="/employee/*" element={<EmployeeWrap />} />
        <Route path="/manager/*" element={<ManagerWrap />} />
      </Routes>
    </Router>
  );
}

export default App;

/*function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}*/