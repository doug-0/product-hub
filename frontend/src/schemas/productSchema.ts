import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().min(0, 'Price must be zero or positive').required('Price is required'),
  imageUrl: yup.string().url('Must be a valid URL').required('Image URL is required'),
});