export type AiResponse = {
    description: string;
    imageUrl: string;
    error?: { type: string; message: string }[];
};