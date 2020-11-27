const { GraphQLServer } = require('graphql-yoga');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// 1
const typeDefs = `
    type Query {
        lives: [Live]
        questionnaires: [Questionnaire!]!
    }

    type Live {
        id: ID!
        title: String
        description: String
        questionnaire: Questionnaire
    }

    type Questionnaire {
        id: ID!
        title: String
        description: String
        live: Live
    }
`
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
}
main();

// 2
const resolvers = {
  Query: {
    lives: async () => {
        const lives = await prisma.live.findMany();
        return lives;
    },
    questionnaires: async () => {
        const questionnaires = await prisma.questionnaire.findMany();
        return questionnaires;
    }
  },
  Questionnaire: {
    live: async (node) => {
        return await prisma.questionnaire.findUnique({ where: { id: node.id }}).live()
    }
  },
  Live: {
    questionnaire: async (node) => {
        return await prisma.live.findUnique({ where: { id: node.id }}).questionnaire()
    }
  }
}

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    prisma,
  }
})
server.start(() => console.log(`Server is running on http://localhost:4000`))