import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();
/*
async function connectDB(){
    console.log("💥 Connecting to database...");

    prisma.$connect()
        .then(() => {        
            console.log("✅ Connected to database");
        })
        .catch(err => {
            console.error("👾 Failed to connect to the database.\n", err)
            process.abort();

        })
}

async function main() {
    
    const FIRSTNAME = "Usuário"
    const LASTNAME =  "Administrador"
    const EMAIL = "admin@admin.com"
    const PASSWORD = "admin"

    connectDB()
        .then(async () =>{
            await prisma.user.findFirst({
                where:{
                    email: EMAIL
                }
            }).then(async resp =>{
                if (!resp){
                    const passwordHash = await hash(PASSWORD, 8)
        
                    await prisma.user.create({
                        data:{
                            firstName: FIRSTNAME,
                            lastName: LASTNAME,
                            email: EMAIL,
                            password: passwordHash
                        },
                        select:{
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

*/
export default prisma;