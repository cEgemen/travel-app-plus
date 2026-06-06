import Redis from "ioredis"
import { REDIS } from "@config/app.config"

const redis = new Redis(REDIS.url, {
    lazyConnect: true,
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
})

redis.on("error", (err) => process.stderr.write(`[Redis] error: ${err.message}\n`))

export async function connectRedis(): Promise<void> {
    await redis.connect()
    process.stdout.write("[Redis] connected\n")
}

export async function disconnectRedis(): Promise<void> {
    await redis.quit()
    process.stdout.write("[Redis] disconnected\n")
}

export async function pingRedis(): Promise<boolean> {
    try {
        return (await redis.ping()) === "PONG"
    } catch {
        return false
    }
}

export default redis
