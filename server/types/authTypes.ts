require('dotenv').config()
import { Sequelize, DataTypes } from "sequelize"

const sequelize = new Sequelize('biblespace', 'ubuntu',null,{
  host: 'localhost',
  dialect: 'postgres'
})



