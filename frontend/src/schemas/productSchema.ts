import * as yup from 'yup';

export const productSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  description: yup.string().max(200, 'Descrição deve ter no máximo 200 caracteres').required('Descrição é obrigatória'),
  price: yup.number().min(0, 'Preço deve ser zero ou positivo').required('Preço é obrigatório'),
  imageUrl: yup.string().url('Deve ser uma URL válida').required('URL da imagem é obrigatória'),
  generateDescription: yup.boolean().default(true),
});