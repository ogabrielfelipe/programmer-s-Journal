import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

let prisma = new PrismaClient();

export default prisma;