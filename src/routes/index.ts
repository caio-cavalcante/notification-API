import { Router } from 'express';
import { handleContact } from '../controllers/contactController';

const router = Router();

// Rota de Health Check (importante para o Render não derrubar o serviço)
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', server: 'IF-Talentos Notify Service' });
});

// Rota de Fale Conosco
router.post('/contact', handleContact);

export default router;