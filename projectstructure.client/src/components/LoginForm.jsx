import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ onLogin }) {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://localhost:7048/api/auth/login', form);
            localStorage.setItem('token', res.data.token);
            onLogin?.(); // Optional callback
            navigate('/product-form'); // Redirect here
        } catch {
            setError('Invalid credentials');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 5, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" textAlign="center">Login</Typography>
            <TextField name="username" label="Username" value={form.username} onChange={handleChange} required />
            <TextField name="password" type="password" label="Password" value={form.password} onChange={handleChange} required />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" fullWidth>Login</Button>
            <Typography variant="body2" mt={2}>
                Don't have an account? <a href="/register">Register</a>
            </Typography>
        </Box>
    );
}

