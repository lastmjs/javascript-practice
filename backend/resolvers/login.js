// Based on https://www.prisma.io/docs/maintain/graphcool-to-prisma/authentication-and-authorization-gcf3/

import { prisma } from '../lambda.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function login(parent, args, context, info) {
    // The reason we are manually putting a selection set in is
    // because by default prisma will not return fields from relations
    const user = await prisma.query.user({
        where: {
            email: args.email
        }
    }, `
        {
            id
            email
            password
            tokens
            termsAcceptedVersion
            assessmentInfos {
                id
                assessment {
                    concept {
                        id
                    }
                }
                answeredCorrectly
            }
        }
    `);

    if (!user) {
        throw new Error('User not found');
    }

    const valid = await bcrypt.compare(args.password, user.password);

    if (!valid) {
        throw new Error('Invalid password');
    }

    const jwToken = jwt.sign({ userId: user.id }, process.env.APPLICATION_SERVER_SECRET);

    context.event.headers['authorization'] = `Bearer ${jwToken}`;

    return {
        user,
        jwt: jwToken
    };
}