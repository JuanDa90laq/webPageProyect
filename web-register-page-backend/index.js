import express from "express"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
const port = 5000

app.get('/', (req, res) => {
  const responseObj = {
    imagen: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, quaerat! Maiores obcaecati nisi eaque odit facilis voluptatum iusto inventore quis, amet enim exercitationem necessitatibus eligendi sequi eum perspiciatis. Nihil, odit!'
  }
  res.header("Access-Control-Allow-Origin", "*");
  res.json(responseObj)
})

app.post('/ingresar', (req, res) => {
  console.log(req.body)
  res.header("Access-Control-Allow-Origin", "*");
  res.json({success: true, message: 'Datos enviados correctamente'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
