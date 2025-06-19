import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  description: yup.string().max(200, 'Descrição deve ter no máximo 200 caracteres').required('Descrição é obrigatória'),
  price: yup.number().min(1, 'Preço deve ser positivo').required('Preço é obrigatório'),
  imageUrl: yup.string().required(),
  generateDescription: yup.boolean().default(true),
});