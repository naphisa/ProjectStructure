import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api/productService';
import ProductForm from '../components/ProductForm';

export default function NewProduct() {
    const navigate = useNavigate();

    const handleSubmit = async (data) => {
        await createProduct(data);
        navigate('/');
    };

    return (
        <div>
            <h2>Add New Product</h2>
            <ProductForm onSubmit={handleSubmit} />
        </div>
    );
}