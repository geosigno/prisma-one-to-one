// 1
const { PrismaClient } = require("@prisma/client")

// 2
const prisma = new PrismaClient()

//3
async function main() {
    const newLive = await prisma.live.create({
        data: {
            title: "Live 1",
            description: "Description 1",
        }
    });
    const newQuestionnaire = await prisma.questionnaire.create({
        data: {
            title: "Questionnaire 1",
            description: "Description 1",
            live: { connect: { id: newLive.id } }
        }
    });

//   const allLives = await prisma.live.findMany()
//   console.log(allLives)
}

//4
main()
//   .catch(e => {
//     throw e
//   })
//   // 5
//   .finally(async () => {
//     await prisma.disconnect()
//   })