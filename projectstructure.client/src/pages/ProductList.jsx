import { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../api/productService';
import { Link } from 'react-router-dom';

export default function ProductList() {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        const response = await getAllProducts();
        setProducts(response.data);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        loadProducts();
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div>
            <h1>Product List</h1>
            <Link to="/new">Add Product</Link>
            <ul>
                {products.map(p => (
                    <li key={p.id}>
                        <Link to={`/product/${p.id}`}>{p.name}</Link>
                        <button onClick={() => handleDelete(p.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}