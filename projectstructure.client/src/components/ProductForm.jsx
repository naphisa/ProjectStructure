import { useState } from 'react';
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    Button,
    InputLabel,
    FormControl,
    Box,
    Typography
} from '@mui/material';

export default function ProductForm({ initialData = {}, onSubmit }) {
    const [form, setForm] = useState({
        name: initialData.name || '',
        price: initialData.price || '',
        description: initialData.description || '',
        quantity: initialData.quantity || '',
        category: initialData.category || 'general',
        sku: initialData.sku || '',
        available: initialData.available ?? true,
        imageUrl: initialData.imageUrl || ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 500,
                mx: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 3,
                border: '1px solid #ccc',
                borderRadius: 2,
                boxShadow: 2
            }}
        >
            <Typography variant="h5" textAlign="center">Product Form</Typography>

            <TextField
                name="name"
                label="Product Name"
                value={form.name}
                onChange={handleChange}
                required
            />

            <TextField
                name="price"
                label="Price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
            />

            <TextField
                name="description"
                label="Description"
                multiline
                rows={3}
                value={form.description}
                onChange={handleChange}
            />

            <TextField
                name="quantity"
                label="Quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange}
                required
            />

            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    label="Category"
                >
                    <MenuItem value="general">General</MenuItem>
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="clothing">Clothing</MenuItem>
                    <MenuItem value="books">Books</MenuItem>
                    <MenuItem value="home">Home</MenuItem>
                </Select>
            </FormControl>

            <TextField
                name="sku"
                label="SKU"
                value={form.sku}
                onChange={handleChange}
            />

            <TextField
                name="imageUrl"
                label="Image URL"
                value={form.imageUrl}
                onChange={handleChange}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        name="available"
                        checked={form.available}
                        onChange={handleChange}
                    />
                }
                label="Available"
            />

            <Button variant="contained" color="primary" type="submit">
                Save Product
            </Button>
        </Box>
    );
}