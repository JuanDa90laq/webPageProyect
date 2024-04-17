import express from "express"
import sql from './db.js'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
const port = 5000

const buscarPersona = async (id) => {
  const user = await sql`
    select *
    from public."user"
    where "user"."Id" = ${id}
  `
  return user
};

const getInitialInfo = async() => {
  const info = await sql`
    select *
    from public."configInit"
  `
  return info
}

const ingresarUser = async (user) => {
  console.log(user.name)
  const insertUser = await sql`
    insert into public."user" ("Name", "Phone", "Email", "Country")
    values (${user.name}, ${user.phone}, ${user.email}, ${user.country})
  `
  return insertUser
}

app.get('/', async (req, res) => {
  const info = await getInitialInfo()
  res.header("Access-Control-Allow-Origin", "*");
  console.log('aca devolvemos el objecto con el que estamos mostrando info en el index', info[0])
  res.json(info[0])
})

app.post('/ingresar', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log(req.body)
  const user = await ingresarUser(req.body)
  console.log('estos son los datos que recibimos en el body de el frontend', req.body)
  res.json({success: true, message: 'Datos enviados correctamente', user: req.body})
})

app.get('/consult', async (req, res) =>  {
  res.header("Access-Control-Allow-Origin", "*");
  const id = req.query.id
  console.log('este es el id que me llega del frontend', id)
  const persona = await buscarPersona(id)
  console.log('aca estamos devolviendo la persona con el mismo id', persona)
  res.json({success: true, data: persona[0]})
})

app.listen(port, () => {
  console.log(`Servidor Corriendo en el puerto ${port}`)
})
