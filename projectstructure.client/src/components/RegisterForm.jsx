// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    const [form, setForm] = useState({ fullname: '', username: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setError('');
            const res = await axios.post('https://localhost:7048/api/auth/register', form);
            setSuccess(res.data.message);
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            setError(err.response?.data || 'Registration failed');
        }
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    };


    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ maxWidth: 400, mx: 'auto', mt: 5, p: 3, border: '1px solid #ccc', borderRadius: 2 }}
        >
            <Typography variant="h5" mb={2}>Register</Typography>
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">{success}</Typography>}
            <TextField
                label="Fullname"
                name="Fullname"
                value={form.fullname}
                onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Email"
                name="username"
                value={form.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPpassword}
                onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                }
                fullWidth
                margin="normal"
                required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Register
            </Button>
        </Box>
    );
}