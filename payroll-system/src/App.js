import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminWrap from './admin/AdminWrap';
import EmployeeWrap from './employee/EmployeeWrap';

function App() {
  return (
    <Router>
      <div className="All">
        <EmployeeWrap />
        <AdminWrap />
      </div>
    </Router>
  );
}

export default App;