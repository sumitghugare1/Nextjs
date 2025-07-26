import {Resend} from 'resend';
import VerificationEmail from '../../emails/VerificationEmails';
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
    ): Promise<ApiResponse> {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    try {
        await resend.emails.send({
        from: '<no-reply@example.com>',
        to: email,
        subject: 'Your Verification Code',
        react: VerificationEmail({ username, otp:verifyCode }),
        });
        return {
            success: true,
            message: 'Verification email sent successfully.',
        };
    } catch (error) {
        console.error('Error sending verification email:', error);
        return {
            success: false,
            message: 'Failed to send verification email.',
        };
    }
}