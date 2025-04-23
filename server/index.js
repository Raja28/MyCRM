const express = require('express')
const app = express()
const cors = require('cors')
const { DBConnection } = require('./connection/DBConnection')
require('dotenv').config()

PORT = process.env.PORT || 2026
app.use(express.json())
app.use(cors({
    origin: "*",
    credentials: true
}))

DBConnection()

const leadRoute = require('./routes/lead')

app.use('/lead', leadRoute)

app.listen(PORT, () => {
    console.log(`MyCRM running on port ${PORT}`);

})
