import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createProduct } from '@/api/products';
import type { Product } from '@/types/Product';
import { useNavigate } from 'react-router-dom';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { productSchema } from '@/schemas/productSchema';
import { toast } from 'sonner';
import InputMoney from '@/components/ui/input-money';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import IconAI from '@/assets/icons/ai-icon.svg';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useState } from 'react';

type FormData = yup.InferType<typeof productSchema>;

export default function ProductForm() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormData>({
        resolver: yupResolver(productSchema),
        defaultValues: {
            generateDescription: true,
        },
    });

    async function onSubmit(data: FormData) {
        try {
            setIsLoading(true);

            await createProduct(data as Product);

            toast.success('Produto criado com sucesso');

            navigate('/');
        } catch (error) {
            toast.error('Falha ao criar produto', {
                description: 'Por favor, tente novamente',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="max-w-full mx-auto mt-8">
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem className="w-full md:w-2/3">
                                    <FormLabel>Nome *</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Nome do produto" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField
                                control={form.control}
                                name="generateDescription"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-center gap-2 w-full md:w-1/3 mt-2 md:mt-8">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="flex items-center gap-2">
                                                    <Avatar>
                                                        <AvatarImage src={IconAI} className="w-5 h-5" />
                                                    </Avatar>
                                                    <span className="text-sm">
                                                        Gerar descrição e imagem do produto via IA
                                                    </span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>
                                                    Ao marcar esta opção, a descrição e a imagem do produto serão geradas automaticamente por IA com base no nome informado.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <FormControl>
                                            <Switch onCheckedChange={field.onChange} checked={field.value} className='cursor-pointer' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição *</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="Descrição do produto" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="imageUrl" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Imagem do produto</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="URL da imagem" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <InputMoney
                            form={form}
                            name="price"
                            label="Preço *"
                            placeholder="R$ 0,00"
                        />
                        <div className="flex justify-center mt-8">
                            <Button type="submit" className="w-full md:w-1/5" disabled={isLoading}>
                                {isLoading ? 'Carregando...' : 'Adicionar produto'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
