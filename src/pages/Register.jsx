import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${apiUrl}/api/auth/register`, form);
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        <input className="form-control mb-2" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input className="form-control mb-2" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
};

export default Register;
