import React from 'react';
import TaskDashboard from '../components/TaskDashboardComponent/TaskDashboard';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Task Management System</h1>
      <div>
        <TaskDashboard />
      </div>
    </div>
  );
};

export default HomePage;
