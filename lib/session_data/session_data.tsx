import { auth } from '@/auth';

export const sessionFunc = async () => {
    try {
        const session = await auth();
        return session

    } catch (error) {
        throw new Error(String(error))
    }
}