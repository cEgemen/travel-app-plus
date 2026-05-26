
import app from "@app/app"
import { createServer } from "http"

const PORT = process.env.PORT ?? 3000

const server = createServer(app)

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use`)
    } else if (error.code === "EACCES") {
        console.error(`Port ${PORT} requires elevated privileges`)
    } else {
        console.error("Server error:", error.message)
    }
    process.exit(1)
})

const shutdown = (signal: string) => {
    console.log(`\n${signal} received. Shutting down gracefully...`)
    server.close((err) => {
        if (err) {
            console.error("Error during shutdown:", err.message)
            process.exit(1)
        }
        console.log("Server closed.")
        process.exit(0)
    })
}

process.on("SIGTERM", () => shutdown("SIGTERM"))
process.on("SIGINT", () => shutdown("SIGINT"))

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err)
    process.exit(1)
})

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason)
    process.exit(1)
})
