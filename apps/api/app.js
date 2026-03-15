const express = require("express")
const app = express()

//middleware
app.use(express.json())

// routes
app.get("/", (req,res)=> {
    res.send("Hello World")
})

app.get("/user/:name",(req,res)=> {
    let username = req.params.name
    res.send(`Your name is:  ${username}`)
})


module.exports = app