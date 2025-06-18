import { Routes, Route, Link } from 'react-router-dom';
import Home from '@/pages/Home';
import ProductForm from '@/components/product-form/ProductForm';

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/new">New Product</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<ProductForm />} />
      </Routes>
    </>
  );
}