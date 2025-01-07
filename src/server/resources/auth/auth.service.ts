import { signInSchema } from '@/lib/zod';
import { ZodError } from 'zod';
import UserService from '../user/user.service';

export const authorizeUser = async (credentials) => {
    try {
        if (!credentials) {
            throw new Error('No credentials provided.');
        }

        const { email, password } = await signInSchema.parseAsync(credentials);
        const user = await UserService.getUserByCredentials(email, password);

        if (!user) {
            throw new Error('User not found.');
        }

        return user;
    } catch (error) {
        console.error(error);
        if (error instanceof ZodError) {
            return null;
        } else {
            throw new Error('Internal server error');
        }
    }
};
