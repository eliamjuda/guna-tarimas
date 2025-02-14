import { PrismaClient } from '@prisma/client'

// Agregar prisma al tipo global de NodeJS
declare global {
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export default prisma