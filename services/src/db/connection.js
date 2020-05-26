import { Sequelize } from 'sequelize'

require('dotenv').config()

const DB_URL = process.env.DB_URL

const sequelize = new Sequelize(DB_URL, {
  dialectOptions: {
    charset: 'utf8',
    multipleStatements: true,
  },
  logging: false,
})

export default sequelize
