import { ApiError, STATUS_CODES } from "@shared/errors/api.errors";
import { NextFunction, Request, Response } from "express";

const MAX_PATH_LENGTH = 512

const isStartWithApi = (path: string, allowedModules: string[]) => {
    if (!path || !path.trim()) {
        return false
    }

    const splitPaths = path.split('/').filter(Boolean)

    if (allowedModules.length > 0) {
        if (allowedModules.includes(splitPaths[1]))
            return true
    }

    if (splitPaths[1] !== "api")
        return false

    return true
}

const hasNullByte = (rawPath: string): boolean => {
    return rawPath.includes('%00') || rawPath.includes('\0')
}

const fullyDecode = (path: string): string => {
    let current = path
    let previous = ''
    while (current !== previous) {
        previous = current
        try {
            current = decodeURIComponent(current)
        } catch {
            break
        }
    }
    return current
}

const hasPathTraversal = (decodedPath: string): boolean => {
    return /(\.\.[/\\]|[/\\]\.\.)/.test(decodedPath)
}

const hasDangerousChars = (decodedPath: string): boolean => {
    return /[|;&`<>{}$!]/.test(decodedPath)
}

export const securePath = (allowedModules: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const rawPath = req.path

        if (rawPath.length > MAX_PATH_LENGTH)
            return next(new ApiError("Invalid Path", STATUS_CODES.BAD_REQUEST))

        if (!isStartWithApi(rawPath, allowedModules))
            return next(new ApiError("Invalid Path", STATUS_CODES.BAD_REQUEST))

        if (hasNullByte(rawPath))
            return next(new ApiError("Invalid Path", STATUS_CODES.BAD_REQUEST))

        const decodedPath = fullyDecode(rawPath)

        if (hasPathTraversal(decodedPath))
            return next(new ApiError("Invalid Path", STATUS_CODES.BAD_REQUEST))

        if (hasDangerousChars(decodedPath))
            return next(new ApiError("Invalid Path", STATUS_CODES.BAD_REQUEST))

        next()
    }
}
