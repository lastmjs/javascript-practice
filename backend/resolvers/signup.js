//TODO setup secret environment variable

import { prisma } from '../lambda.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await prisma.mutation.createUser({
        data: {
            email: args.email,
            password
        }
    });

    return {
        token: jwt.sign({ userId: user.id }, 'secret'),
        user
    };
}