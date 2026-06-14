import "dotenv/config"

const requireEnv = (key: string): string => {
    const value = process.env[key]
    if (!value) throw new Error(`Missing required environment variable: ${key}`)
    return value
}

const isProd = process.env.NODE_ENV === "production"

export const SYSTEM = {
    port: process.env.PORT ?? 3000,
    nodeEnv: process.env.NODE_ENV ?? "dev"
}

export const JWT = {
    accessSecret: isProd ? requireEnv("ACCESS_SECRET") : (process.env.ACCESS_SECRET ?? "dev-access-secret"),
    accessExpiresIn: (process.env.ACCESS_EXPIRES_IN ?? 1000 * 60 * 30) as number,
    refreshSecret: isProd ? requireEnv("REFRESH_SECRET") : (process.env.REFRESH_SECRET ?? "dev-refresh-secret"),
    refreshExpiresIn: (process.env.REFRESH_EXPIRES_IN ?? 1000 * 60 * 60 * 24 * 7) as number,
    forgetSecret: isProd ? requireEnv("FORGET_SECRET") : (process.env.FORGET_SECRET ?? "dev-forget-secret"),
    forgetExpiresIn: (process.env.FORGET_EXPIRES_IN ?? 1000 * 60 * 8) as number,
}

export const REDIS = {
    url: isProd ? requireEnv("REDIS_URL") : (process.env.REDIS_URL ?? "redis://localhost:6379"),
    sessionTTL: Number(process.env.SESSION_TTL) || 7 * 24 * 60 * 60 * 1000 + (2 * 60 * 1000),
}