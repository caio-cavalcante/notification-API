import { Resend } from "resend";
import dotenv from 'dotenv';

dotenv.config();

interface SendEmailParams {
    name: string;
    email: string;
    message: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ name, email, message }: SendEmailParams) {
    if (!process.env.RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY não configurada");
    }

    try {
        await resend.emails.send({
            from: "contato@iftalentos.page",
            to: [process.env.CONTACT_RECEIVER_EMAIL || "contato@iftalentos.page"],
            subject: `Novo contato - ${name}`,
            html: `
                <h3>Nova mensagem do Fale Conosco - IF Talentos</h3>
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensagem:</strong></p>
                <p>${message}</p>
            `,
        });
    } catch (error) {
        console.error("❌ Erro ao enviar e-mail (Resend):", error);
        throw new Error("Falha ao enviar e-mail");
    }
}
