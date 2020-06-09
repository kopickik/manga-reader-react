require('dotenv').config()
import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import chalk from 'chalk'

import schema from '@/graphql/schema'
import resolvers from '@/graphql/resolvers'
import typeDefs from '@/graphql/typeDefs'

import setupRoutes from './routes'

import formatGraphQLErrors from './formatGraphQLErrors'

const PORT = process.env.PORT

const apolloServer = new ApolloServer({
  context: (a) => a,
  formatError: formatGraphQLErrors,
  schema,
  resolvers,
  typeDefs,
})

const app = express()

app.use(cookieParser())

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
)

app.get('/', (req, res) => {
  res.json({ message: 'Express app up and running.' })
})

apolloServer.applyMiddleware({ app, cors: false, path: '/graphql' })

setupRoutes(app)

app.all('*', (req, res) => {
  res.status(404).json({ message: '404 Not Found' })
})

app.listen(PORT, '0.0.0.0', () => {
  console.info(chalk.cyanBright(`Manga API services listening on ${PORT}..`))
})
