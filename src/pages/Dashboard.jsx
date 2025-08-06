import React from 'react';
import { useAuth } from '../context/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">Welcome back, {user?.name || 'User'} 👋</div>

      <div className="dashboard-card">
        <h4>My Bookings</h4>
        <p>View your upcoming bookings and history here.</p>
      </div>

      {user?.role === 'admin' && (
        <div className="dashboard-card">
          <h4>Admin Panel</h4>
          <p>Manage users and turfs from the admin dashboard.</p>
        </div>
      )}

      {user?.role === 'manager' && (
        <div className="dashboard-card">
          <h4>Manager Panel</h4>
          <p>View and manage your assigned turfs.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
