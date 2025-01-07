
import { prisma } from '@/prisma';
import bcrypt from 'bcryptjs';

export default class UserService {
    static async getUserByCredentials(email: string, plainPassword: string) {
        try {
            console.log("email: ", email)
            const user = await prisma.user.findFirstOrThrow({
                where: {
                    email
                }
            });

            const { pwHash } = user;

            const isMatch = await bcrypt.compare(plainPassword, pwHash);

            if (isMatch) {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching user or comparing passwords:', error);
            return null;
        }
    }


    static async getUserByEmail(email: string) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });
            return user;
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw new Error('Unable to retrieve user');
        }
    }

    static async createUserByGoogle(email: string) {
        try {
            const username = email.split('@')[0];
            const newUser = await prisma.user.create({
                data: {
                    email,
                    name: username
                }
            });

            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Unable to create user');
        }
    }
}