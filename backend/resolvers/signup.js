// Based on https://www.prisma.io/docs/maintain/graphcool-to-prisma/authentication-and-authorization-gcf3/

import { prisma } from '../lambda.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);

    const userAlreadyExists = await prisma.exists.User({
        email: args.email
    });

    if (userAlreadyExists) {
        throw new Error('That email address has already been registered');
    }

    const user = await prisma.mutation.createUser({
        data: {
            email: args.email,
            password
        }
    }, `
        {
            id
            email
            tokens
            assessmentInfos {
                assessment {
                    concept {
                        id
                    }
                }
                answeredCorrectly
            }
        }
    `);

    return {
        user,
        jwt: jwt.sign({ userId: user.id }, process.env.APPLICATION_SERVER_SECRET)
    };
}