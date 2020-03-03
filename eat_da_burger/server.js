const express = require('express')
const { join } = require('path')
const app = express()

app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static(join(__dirname, 'public')))
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'jsx')

const db = require('./config/db.js')

app.get('/', (req, res) => {
  db.query('SELECT * FROM burgers', (err, list) => {
    if (err) { console.log(err) }
    res.json(list)
  })
})

app.post('/', (req, res) => {
  db.query('INSERT INTO burgers SET ?', req.body, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

app.put('/burgername', (req, res) => {
  db.query('UPDATE burgers SET ? WHERE ?', [req.body, { burgername: req.params.burgername }], err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

app.delete('/burgername', (req, res) => {
  db.query('DELETE FROM burgers WHERE ?', { burgername: req.params.burgername }, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})


// const eatburger = app.get('/',(req,res)=>{
//   db.query('SELECT * FROM burgers WHERE beDevoured = false', (err, list) => {
//     if (err) { console.log(err) }
//     res.json(list)
//   })
// })

// const ateburger = app.get('/', (req, res) => {
//   db.query('SELECT * FROM burgers WHERE beDevoured = true ', (err, list) => {
//     if (err) { console.log(err) }
//     res.json(list)
//   })
// })





app.listen(3000)
