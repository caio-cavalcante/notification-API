import { Request, Response } from "express";
import { z } from "zod";
import { sendEmail } from "../services/emailService";

// Schema de validação
const contactSchema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
});

export const handleContact = async (req: Request, res: Response) => {
    try {
        // 1. Validação dos dados
        const { name, email, message } = contactSchema.parse(req.body);

        // 2. Montagem do corpo do e-mail
        const emailHtml = `
            <h3>Nova mensagem do Fale Conosco - IF Talentos</h3>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <hr />
            <p><strong>Mensagem:</strong></p>
            <p>${message}</p>
        `;

        // 3. Envio do e-mail
        await sendEmail({
            to: process.env.EMAIL_SUPPORT as string, // Definido no .env
            subject: `[Fale Conosco] Contato de ${name}`,
            html: emailHtml,
        });

        // 4. Resposta de sucesso
        return res.status(200).json({
            success: true,
            message:
                "E-mail enviado com sucesso. Entraremos em contato em breve.",
        });
    } catch (error) {
        // Tratamento de erros de validação do Zod
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.issues.map((e) => ({
                    field: e.path[0],
                    message: e.message,
                })),
            });
        }

        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Erro interno ao processar sua solicitação.",
        });
    }
};
