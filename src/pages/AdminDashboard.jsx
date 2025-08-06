import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/useAuth';
const apiUrl = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const { token } = useAuth();
  const [turfs, setTurfs] = useState([]);
  const [form, setForm] = useState({
    name: '', location: '', pricePerHour: '', slots: '', image: ''
  });

  const fetchTurfs = async () => {
    const res = await axios.get(`${apiUrl}/api/turfs`, {
      headers: { Authorization: `Bearer ${token}`},
    });
    setTurfs(res.data);
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  const handleCreate = async () => {
    try {
      await axios.post(
        `${apiUrl}/api/turfs`,
        {
          ...form,
          slots: form.slots.split(',').map(s => s.trim()),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTurfs();
      setForm({ name: '', location: '', pricePerHour: '', slots: '', image: '' });
    } catch (err) {
      alert('Failed to create turf');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this turf?')) return;
    await axios.delete(`${apiUrl}/api/turfs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTurfs();
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <div className="card p-3 mb-4">
        <h4>Create New Turf</h4>
        <input placeholder="Name" className="form-control mb-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Location" className="form-control mb-2" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <input placeholder="Price Per Hour" className="form-control mb-2" value={form.pricePerHour} onChange={(e) => setForm({ ...form, pricePerHour: e.target.value })} />
        <input placeholder="Slots (comma separated)" className="form-control mb-2" value={form.slots} onChange={(e) => setForm({ ...form, slots: e.target.value })} />
        <input placeholder="Image URL (optional)" className="form-control mb-2" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
        <button className="btn btn-success" onClick={handleCreate}>Create Turf</button>
      </div>

      <h4>All Turfs</h4>
      <ul className="list-group">
        {turfs.map((t) => (
          <li key={t._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{t.name}</strong> – {t.location} – ₹{t.pricePerHour}
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
