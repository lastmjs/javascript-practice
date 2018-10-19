// Based on https://www.prisma.io/docs/maintain/graphcool-to-prisma/authentication-and-authorization-gcf3/

import { prisma } from '../lambda.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);

    //TODO first check if user already exists and throw the error

    const user = await prisma.mutation.createUser({
        data: {
            email: args.email,
            password
        }
    });

    return {
        user,
        jwt: jwt.sign({ userId: user.id }, process.env.APPLICATION_SERVER_SECRET)
    };
}