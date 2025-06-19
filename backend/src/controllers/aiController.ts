import { Request, Response } from 'express';
import { openai } from '../config/openai';

export async function generateProductContent(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Nome do produto é obrigatório' });
    }

    let description = `Descrição do produto ${name}`;

    let imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;

    const errors: { type: string; message: string }[] = [];

    try {
        const descriptionResponse = await openai.chat.completions.create({
            model: 'gpt-4.1-mini-2025-04-14',
            messages: [
                { role: 'system', content: 'Você será um assistente para gerar descrições simples e concisa de acordo com o nome ou descrição do produto dado.' },
                { role: 'user', content: `Crie uma descrição simples e persuasiva para o seguinte produto: ${name}` },
            ],
        });

        if (descriptionResponse?.choices?.[0]?.message?.content) {
            description = descriptionResponse.choices[0].message.content;
        }
    } catch (err) {
        console.warn('Erro ao gerar descrição com IA: ', err);

        errors.push({ type: 'description', message: 'Erro ao gerar descrição via IA' });
    }

    try {
        const imageResponse = await openai.responses.create({
            model: "gpt-4.1-mini",
            input: `Foto profissional de um produto chamado "${name}" em fundo branco, estilo de fotografia de catálogo`,
            tools: [{
                type: "image_generation",
                quality: "low",
                size: "1024x1024",
                output_format: "jpeg",
                output_compression: 70,
            }],
        });

        const base64Image = (imageResponse.output?.[0] as any)?.result;

        if (base64Image) {
            imageUrl = `data:image/png;base64,${base64Image}`;
        }
    } catch (err) {
        console.warn('Erro ao gerar imagem com IA: ', err);

        errors.push({ type: 'image', message: 'Erro ao gerar imagem via IA' });
    }

    return res.status(200).json({
        description,
        imageUrl,
        error: errors.length > 0 ? errors : undefined,
    });
}
