import { Router } from 'express';
import { generateProductContent } from '../controllers/aiController';

const router = Router();

router.post('/generate-product-content', (req, res) => {
    generateProductContent(req, res);
});

export default router;