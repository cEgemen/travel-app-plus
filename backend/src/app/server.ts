import app from "@app/app"
import { createServer } from "http"
import { connectRedis, disconnectRedis } from "@config/redis.config"
import { connectDB, disconnectDB } from "@config/db.config"
import { SYSTEM } from "@config/app.config"

const server = createServer(app)

async function bootstrap(): Promise<void> {
    await connectDB()
    await connectRedis()
    server.listen(SYSTEM.port, () => {
        process.stdout.write(`[Server] running on port ${SYSTEM.port}\n`)
    })
}

async function shutdown(signal: string): Promise<void> {
    process.stdout.write(`\n[Server] ${signal} received. Shutting down...\n`)
    server.close(async () => {
        await disconnectRedis()
        await disconnectDB()
        process.exit(0)
    })
}

bootstrap().catch((err) => {
    process.stderr.write(`[Server] failed to start: ${err.message}\n`)
    process.exit(1)
})

server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
        process.stderr.write(`[Server] port ${SYSTEM.port} is already in use\n`)
    } else {
        process.stderr.write(`[Server] error: ${error.message}\n`)
    }
    process.exit(1)
})

process.on("SIGTERM", () => shutdown("SIGTERM"))
process.on("SIGINT", () => shutdown("SIGINT"))
process.on("uncaughtException", (err) => {
    process.stderr.write(`[Server] uncaught exception: ${err.message}\n`)
    process.exit(1)
})
process.on("unhandledRejection", (reason) => {
    process.stderr.write(`[Server] unhandled rejection: ${reason}\n`)
    process.exit(1)
})
