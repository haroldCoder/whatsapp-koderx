import dotenv from "dotenv"

dotenv.config()

export const DB_HOST = process.env.DB_HOST || 'your_host'
export const DB_USER = process.env.DB_USER || 'default'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'your_password'
export const DB_NAME = process.env.DB_NAME || 'your_database'
export const DB_PORT: number = parseInt(process.env.DB_PORT || '50013', 10);
export const PORT = process.env.PORT || 5000