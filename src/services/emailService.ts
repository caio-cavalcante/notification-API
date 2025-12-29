import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true, // true para 465, false para outras portas
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

interface SendMailDTO {
    to: string;
    subject: string;
    html: string;
    text?: string; // Fallback para clientes sem HTML
}

export const sendEmail = async ({ to, subject, html, text }: SendMailDTO) => {
    try {
        const info = await transporter.sendMail({
            from: `"IF-Talentos Notificações" <${process.env.EMAIL_FROM}>`,
            to,
            subject,
            html,
            text: text || html.replace(/<[^>]*>?/gm, ''), // Remove tags HTML para gerar texto simples
        });

        console.log(`📨 E-mail enviado: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error('❌ Erro ao enviar e-mail:', error);
        throw new Error('Falha ao enviar e-mail');
    }
};