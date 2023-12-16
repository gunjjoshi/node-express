const express = require('express')
const app = express()
const path = require('path')

app.set("view engine", "ejs")

app.use(express.static('./'))

app.use(function(req, res, next){
    next();
})

app.get('/', function (req, res) {
  res.render(path.join(__dirname, 'views', 'index'), {title: 'Title'});
})

// app.get('/:name', function (req, res) {
//   res.render(path.join(__dirname, 'views', 'index'), {title: req.params.name});
// })

app.get('/loader', (req, res) =>{
    res.render('loader', {age: 19});
})

app.get('/profile', function (req, res) {
  res.send('Hello World from profile')
})

app.get('/profile/:var', function (req, res) {
    console.log(req.params)
    res.send(`Hello World from the profile of ${req.params.var}`)
})

app.listen(3000)