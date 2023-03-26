import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

type User = {
    id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: string,
    created_at: string,
    updated_at: string
}

async function connectDB() {
    prisma.$connect()
}

async function main() {

    const FIRSTNAME = "Usuário"
    const LASTNAME = "Administrador"
    const EMAIL = "admin@admin.com"
    const PASSWORD = "admin"

    connectDB()
        .then(async (resp) => {
            await prisma.user.findFirst({
                where: {
                    email: EMAIL
                }
            }).then(async (resp)  => {
                    if (!resp){
                        const passwordHash = await hash(PASSWORD, 8)

                        await prisma.user.create({
                            data: {
                                firstName: FIRSTNAME,
                                lastName: LASTNAME,
                                email: EMAIL,
                                password: passwordHash
                            },
                            select: {
                                id: true,
                                email: true
                            }
                        })
                    }                
            })
        })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        await prisma.$disconnect()
        process.exitCode = 1;
    })


export default prisma;