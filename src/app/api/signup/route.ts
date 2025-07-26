import dbConnect from "@/lib/dbConnect";    
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { send } from "process";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { email, username, password } = await request.json();

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await UserModel.create({
            email,
            username,
            password: hashedPassword,
        });

        // Send verification email
        const verifyCode = '123456'; // Generate a verification code
        await sendVerificationEmail(email, username, verifyCode);

        return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), { status: 500 });
    }
}

