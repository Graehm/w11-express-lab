const request = require('supertest')
const mongoose = require('mongoose')
const {MongoMemoryServer} = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => {
    console.log('testing this at Port 8080')
})
const User = require('../models/user')
let mongoServer
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

