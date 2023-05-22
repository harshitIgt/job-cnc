const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const path = require('path')
const file = require('./src/routes/genrateFile')
const ejs = require('ejs')


// app.use(express.json())
// app.use(express.text())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.set('views',path.join(__dirname, "views"))
app.set('view engine', 'ejs')

app.get('/', (req,res) => {
    let err = undefined
    res.render('index.ejs',{err})
})
app.use(file)

const PORT = 4800
app.listen(PORT, ()=>{
    console.log(`App is working on port: ${PORT}`)
})