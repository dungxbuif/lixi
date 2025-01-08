import { prisma } from "@/prisma";

const LuckyMoneyRepository = prisma.luckyMoney;

export class LuckyMoneyService {
    static async createLuckyMoney({ name, authorId }) {
        try {
            return LuckyMoneyRepository.create({
                data: { name, ownerId: authorId },
            })
        } catch (error) {
            console.error('Error saving money:', error);
            return null;
        }
    }

    static async getAllLuckyMoneys() {
        try {
            return LuckyMoneyRepository.findMany()
        } catch (error) {
            console.error('Error saving money:', error);
            return null;
        }
    }
}