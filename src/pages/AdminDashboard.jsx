import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/useAuth';

const AdminDashboard = () => {
  const { token } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState([]);
  const [turfs, setTurfs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await axios.get(`${apiUrl}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const turfRes = await axios.get(`${apiUrl}/api/admin/turfs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(userRes.data);
      setTurfs(turfRes.data);
    };

    fetchData();
  }, []);

  return (
    <div className="container admin mt-4">
      <h2>Admin Dashboard</h2>
      <h4 className="mt-4">Users</h4>
      <ul>
        {users.map((u) => (
          <li key={u._id}>{u.name} – {u.role}</li>
        ))}
      </ul>

      <h4 className="mt-4">Turfs</h4>
      <ul>
        {turfs.map((t) => (
          <li key={t._id}>{t.name} – {t.location}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
