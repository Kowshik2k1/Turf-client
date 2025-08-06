import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/useAuth';
const apiUrl = import.meta.env.VITE_API_URL;

const AddTurf = () => {
  const { token } = useAuth();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [slots, setSlots] = useState('');
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState('');

  useEffect(() => {
    const fetchManagers = async () => {
      const res = await axios.get(`${apiUrl}/api/users/managers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setManagers(res.data);
    };
    fetchManagers();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${apiUrl}/api/turfs`,
        {
          name,
          location,
          pricePerHour: price,
          slots: slots.split(','),
          manager: selectedManager,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Turf created successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to create turf');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Turf</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Turf Name</label>
          <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" className="form-control" onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Price per Hour</label>
          <input type="number" className="form-control" onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Slots (comma-separated)</label>
          <input type="text" className="form-control" onChange={(e) => setSlots(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Assign Manager</label>
          <select className="form-control" onChange={(e) => setSelectedManager(e.target.value)} required>
            <option value="">Select Manager</option>
            {managers.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name} ({m.email})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success mt-3">Create Turf</button>
      </form>
    </div>
  );
};

export default AddTurf;
