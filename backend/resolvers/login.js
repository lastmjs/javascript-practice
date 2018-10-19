// Based on https://www.prisma.io/docs/maintain/graphcool-to-prisma/authentication-and-authorization-gcf3/

import { prisma } from '../lambda.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function login(parent, args, context, info) {
    const user = await prisma.query.user({
        where: {
            email: args.email
        }
    });

    if (!user) {
        throw new Error('User not found');
    }

    const valid = await bcrypt.compare(args.password, user.password);

    if (!valid) {
        throw new Error('Invalid password');
    }

    return {
        user,
        jwt: jwt.sign({ userId: user.id }, process.env.APPLICATION_SERVER_SECRET)
    };
}