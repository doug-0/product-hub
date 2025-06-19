import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createProduct, generateProductContent } from '@/api/products';
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
import { useState, useEffect } from 'react';

type FormData = yup.InferType<typeof productSchema>;

export default function ProductForm() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

    const form = useForm<FormData>({
        resolver: yupResolver(productSchema),
        defaultValues: {
            generateDescription: true,
            imageUrl: undefined,
            name: '',
            description: '',
            price: 0,
        },
    });

    const { watch, setValue } = form;

    const nameValue = watch('name');

    const generateDesc = watch('generateDescription');

    useEffect(() => {
        if (!generateDesc || !nameValue) return;

        const handler = setTimeout(() => {
            setIsGenerating(true);

            const promise = generateProductContent({ name: nameValue });

            toast.promise(
                promise,
                {
                    loading: 'Gerando conteúdo via IA...',
                    success: (result) => {
                        const { data } = result;

                        if (data.description) {
                            setValue('description', data.description);
                        }

                        if (data.imageUrl) {
                            setValue('imageUrl', data.imageUrl);

                            setGeneratedImageUrl(data.imageUrl);
                        }

                        if (data.error && Array.isArray(data.error)) {
                            data.error.forEach((err: { message: string }) => toast.error(err.message));
                        }

                        setIsGenerating(false);

                        return 'Conteúdo gerado com sucesso';
                    },
                    error: 'Falha ao gerar conteúdo via IA',
                }
            );
        }, 1200);

        return () => clearTimeout(handler);
    }, [nameValue, generateDesc, setValue]);

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
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
        <Card className="max-w-full mx-auto mt-8 mb-10">
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem className="w-full md:w-2/3">
                                    <FormLabel>Nome *</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Nome do produto" disabled={isGenerating} />
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
                                            <Switch
                                                onCheckedChange={field.onChange}
                                                checked={field.value}
                                                className='cursor-pointer'
                                                disabled={isGenerating}
                                            />
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
                                    <Textarea {...field} placeholder="Descrição do produto" disabled={isGenerating} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormLabel>Imagem do produto</FormLabel>
                        {generatedImageUrl ? (
                            <Card className="mt-4">
                                <CardContent className="p-0 flex justify-center items-center">
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}${generatedImageUrl}`}
                                        alt="Imagem gerada"
                                        className="w-full h-auto rounded"
                                        style={{ maxWidth: '300px' }}
                                    />
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="mt-4">
                                <CardContent className="p-0">
                                    <p className="text-sm text-gray-500 text-center">A imagem criada pela IA será exibida neste espaço.</p>
                                </CardContent>
                            </Card>
                        )}
                        <InputMoney
                            form={form}
                            name="price"
                            label="Preço *"
                            placeholder="R$ 0,00"
                            disabled={isGenerating}
                        />
                        <div className="flex justify-center mt-8">
                            <Button type="submit" className="w-full md:w-1/5" disabled={isLoading || isGenerating}>
                                {isLoading ? 'Carregando...' : 'Adicionar produto'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
