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
app.use("/", (req, res)=>{
    return res.status(200).json({
        success: true,
        message: "MyCRM Server is running successfully"
    })
})

app.listen(PORT, () => {
    console.log(`MyCRM running on port ${PORT}`);

})
