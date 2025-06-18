import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '@/api/products';
import { productSchema } from '@/schemas/productSchema';

type FormData = yup.InferType<typeof productSchema>;

export default function ProductForm() {
  const nav = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(productSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createProduct(data);

      nav('/');
    } catch (err) {
      console.error(err);

      alert('Failed to create product');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register('name')} />
        <p>{errors.name?.message}</p>
      </div>
      <div>
        <label>Description</label>
        <textarea {...register('description')} />
        <p>{errors.description?.message}</p>
      </div>
      <div>
        <label>Price</label>
        <input type="number" step="0.01" {...register('price')} />
        <p>{errors.price?.message}</p>
      </div>
      <div>
        <label>Image URL</label>
        <input {...register('imageUrl')} />
        <p>{errors.imageUrl?.message}</p>
      </div>
      <button type="submit">Create</button>
    </form>
  );
}
