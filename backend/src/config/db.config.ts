import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
})

async function connectDB(): Promise<void> {
    await prisma.$connect()
    process.stdout.write("[DB] connected\n")
}

async function disconnectDB(): Promise<void> {
    await prisma.$disconnect()
    process.stdout.write("[DB] disconnected\n")
}

async function pingDB(): Promise<boolean> {
    try {
        await prisma.$queryRaw`SELECT 1`
        return true
    } catch {
        return false
    }
}

export {
    prisma,
    connectDB,
    disconnectDB,
    pingDB
}
