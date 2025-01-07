import { Account } from '@prisma/client';
import { User } from 'next-auth';
import UserService from '../user/user.service';

export const handleGoogleUser = async (user: User) => {
    if ((user as Account).provider === 'google') {
        const existingUser = await UserService.getUserByEmail(user.email);
        if (!existingUser) {
            await UserService.createUserByGoogle(user.email);
        }
    }
};
