import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
})

export async function connectDB(): Promise<void> {
    await prisma.$connect()
    process.stdout.write("[DB] connected\n")
}

export async function disconnectDB(): Promise<void> {
    await prisma.$disconnect()
    process.stdout.write("[DB] disconnected\n")
}

export async function pingDB(): Promise<boolean> {
    try {
        await prisma.$queryRaw`SELECT 1`
        return true
    } catch {
        return false
    }
}

export default prisma
