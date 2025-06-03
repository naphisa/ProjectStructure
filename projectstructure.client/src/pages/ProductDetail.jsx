import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, updateProduct } from '../api/productService';
import ProductForm from '../components/ProductForm';

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductById(id).then(res => setProduct(res.data));
    }, [id]);

    const handleSubmit = async (data) => {
        await updateProduct(id, data);
        navigate('/');
    };

    return product ? (
        <div>
            <h2>Edit Product</h2>
            <ProductForm initialData={product} onSubmit={handleSubmit} />
        </div>
    ) : <p>Loading...</p>;
}