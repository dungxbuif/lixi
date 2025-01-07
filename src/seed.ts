import { UserRoleEnum } from "./shared/enum";
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';


const saltAndHashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const pwHash = bcrypt.hashSync(password, salt);
    return {
        salt,
        pwHash
    };
};

async function seedUsers() {
    const USERS = [
        {
            name: 'Ha Quoc Dat',
            email: 'dat.haquoc@ncc.asia',
            role: UserRoleEnum.USER,
            password: 'Ncc@123'
        },
    ];

    for (const user of USERS) {
        const existingUser = await prisma.user.findUnique({
            where: { email: user.email }
        });

        if (!existingUser) {
            const { salt, pwHash } = saltAndHashPassword(user.password);
            delete user.password;
            await prisma.user.create({
                data: {
                    ...user,
                    salt,
                    pwHash
                }
            });
        } else {
            await prisma.user.update({
                where: { email: user.email },
                data: {
                    name: user.name,
                }
            });
        }
    }
}

const seedApplication = async () => {
    await seedUsers();
};

seedApplication()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
